/* eslint-disable class-methods-use-this */
import { mergeRight } from 'ramda';

const STATE_CODE = {
  0: 'CONNECTING', // Socket has been created. The connection is not yet open.
  1: 'OPEN', // The connection is open and ready to communicate.
  2: 'CLOSING', // The connection is in the process of closing.
  3: 'CLOSED', // The connection is closed or couldn't be opened.
};

/**
 * @param {String} url websocket server URL
 * @param {Hash} opts
 */
export default class Websocket extends WebSocket {
  constructor(url, opts){
    super(url, opts && opts.protocols);
    const defaultOptions = {
      reconnect:   true,
      pingDelay:   30 * 1000,
    };

    const options = mergeRight(defaultOptions, opts);
    // TODO
  }

  on(eventName, cb){
    console.log(eventName, 'on');
    switch (eventName){
      case 'connection':
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
    console.log('onmessage: cb', cb);
    super.onmessage(cb);
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
