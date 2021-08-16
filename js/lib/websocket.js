import { mergeRight } from 'ramda';
import EventEmitter from 'eventemitter3';

const STATE_CODE = {
  0: 'CONNECTING', // Socket has been created. The connection is not yet open.
  1: 'OPEN', // The connection is open and ready to communicate.
  2: 'CLOSING', // The connection is in the process of closing.
  3: 'CLOSED', // The connection is closed or couldn't be opened.
};

export default class Websocket {
  constructor(opts){
    const defaultOptions = {
      url:         null,
      protocols:   undefined,
      reconnect:   true,
      autoConnect: true,
      pingDelay:   30 * 1000,
    };

    const options = mergeRight(defaultOptions, opts);

    options.autoConnect && this.connect(options.url, options.protocols);
    this.realWs = null;
  }

  connect(url, protocols){
    this.realWs = new WebSocket(url, protocols);
  }

  onmessage(...args){
    this.realWs.onmessage(...args);
  }

  onopen(cb, ...args){
    this.realWs.onopen((e) => {
      cb && cb(e, ...args);
    });
  }

  onerror(cb, ...args){
    this.realWs.onerror((err) => {
      cb && cb(err, ...args);
    });
  }

  onclose(cb, ...args){
    this.realWs.onclose((e) => {
      cb && cb(e, ...args);
    });
  }

  // --------- GETTERS -------

  get readyState(){
    return this.realWs.readyState;
  }

  get state(){
    return STATE_CODE[this.readyState];
  }

  get connected(){
    return this.readyState === 1;
  }

  get originalWs(){
    return this.realWs;
  }
}
