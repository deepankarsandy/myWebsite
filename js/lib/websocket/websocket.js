/* eslint-disable class-methods-use-this */
import { mergeRight, values } from 'ramda';
import WSEvent from './ws_event';

const STATE_CODE = {
  0: 'CONNECTING', // Socket has been created. The connection is not yet open.
  1: 'OPEN', // The connection is open and ready to communicate.
  2: 'CLOSING', // The connection is in the process of closing.
  3: 'CLOSED', // The connection is closed or couldn't be opened.
};

const EVENTS_DEFAULT = {
  message: 'MESSAGE',
  open:    'OPEN',
  close:   'CLOSE',
  error:   'ERROR',
};

/**
 * @param {String} url websocket server URL
 * @param {Hash} opts
 */
export default class Websocket {
  constructor(url, opts){
    const defaultOptions = {
      reconnect:   true,
      pingDelay:   30 * 1000,
    };

    this.options = mergeRight(defaultOptions, opts);
    this.heartbeatPingTimer = null;

    this._onOpen = this._onOpen.bind(this);

    this.init(url);
  }

  init(url){
    this._socket = new WebSocket(url, this.options.protocol); // TODO: init conditionally
    this._socket.onopen = this._onOpen;
    this._socket.onmessage = this._onMessage;
    this._socket.onclose = this._onClose;
    this._socket.onerror = this._onError;
    this.on('ping', this.heartbeat);
  }

  heartbeat(){
    clearTimeout(this.heartbeatPingTimer);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.heartbeatPingTimer = setTimeout(() => {
      console.log('closed by heartbeat');
      this.close();
    }, this.options.pingDelay + 1000);
  }

  on(eventName, cb){
    console.log('listening to: ', eventName);
    WSEvent.on(eventName, cb);
  }

  onopen(cb){
    WSEvent.on(EVENTS_DEFAULT.open, cb);
  }

  onmessage(cb){
    WSEvent.on(EVENTS_DEFAULT.message, cb);
  }

  onclose(cb){
    WSEvent.on(EVENTS_DEFAULT.close, cb);
  }

  onerror(cb){
    WSEvent.on(EVENTS_DEFAULT.error, cb);
  }

  // TODO: extend
  send(...args){
    this._socket.send(...args);
  }

  // TODO: extend
  close(code, reason){
    this._socket.close(code, reason);
  }

  /**
   * @private
   * @param {Event} evt
   */
  _onOpen(evt){
    this.heartbeat();
    console.log('connection opened');
    WSEvent.emit(EVENTS_DEFAULT.open, evt);
  }

  /**
   * @private
   * @param {Event} evt
   */
  _onMessage(evt){
    const { event, payload } = JSON.parse(evt.data);
    // TODO: handle custom events, actions, etc.
    if (event){
      if (values(EVENTS_DEFAULT).includes(event)) throw new Error(`cannot use reserved event: ${event}`);

      console.log(event, 'emitted');
      WSEvent.emit(event, payload);
      return;
    }

    console.log(evt.data);
    WSEvent.emit(EVENTS_DEFAULT.message, evt.data);
  }

  /**
   * @private
   * @param {Event} evt
   */
  _onClose(evt){
    clearTimeout(this.heartbeatPingTimer);
    console.log('connection closed', evt);
    WSEvent.emit(EVENTS_DEFAULT.close, evt);
  }

  /**
   * @private
   * @param {Event} evt
   */
  _onError(evt){
    console.log('connection error', evt);
    WSEvent.emit(EVENTS_DEFAULT.error, evt);
  }

  // --------- GETTERS -------

  get readyState(){
    return this._socket.readyState;
  }

  get state(){
    return STATE_CODE[this._socket.readyState];
  }

  get connected(){
    return this._socket.readyState === 1;
  }
}
