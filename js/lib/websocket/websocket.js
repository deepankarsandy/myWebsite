/* eslint-disable class-methods-use-this */
import { mergeRight } from 'ramda';
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
    // this._socket.on('ping', () => this.heartbeat('ping'));
  }

  heartbeat(who){
    console.log('heartbeat from', who);
    clearTimeout(this.heartbeatPingTimer);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.heartbeatPingTimer = setTimeout(() => {
      this.close();
    }, this.options.pingDelay + 1000);
  }

  on(eventName, cb){
    console.log(eventName, 'on');
    switch (eventName){
      case 'connection':
        console.log('connection');
        // TODO
        break;
      default:
        // TODO
        cb({ data: 'TODO' });
        break;
    }
  }

  onmessage(cb){
    // handle custom events here
    super.onmessage = cb;
  }

  send(...args){
    super.send(...args);
  }

  // --------- GETTERS -------

  get readyState(){
    return this.readyState;
  }

  get state(){
    return STATE_CODE[this.readyState];
  }

  get connected(){
    return this.readyState === 1;
  }

  // get originalWs(){
  //   return this;
  // }
}
