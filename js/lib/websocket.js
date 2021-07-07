import { mergeRight } from 'ramda';
import EventEmitter from './event_emitter';

export default class Websocket extends EventEmitter {
  constructor(opts){
    super(opts);

    const defaultOptions = {
      url:         null,
      protocols:   undefined,
      reconnect:   true,
      autoConnect: true,
      pingDelay:   30 * 1000,
    };

    const options = mergeRight(defaultOptions, opts);

    this.init = this.init.bind(this);

    options.autoConnect && this.connect(options.url, options.protocols);
    this.realWs = null;
  }

  connect(url, protocols){
    this.realWs = new WebSocket(url, protocols);
  }

  onmessage(...args){
    this.realWs.onmessage(...args);
  }

  onerror(...args){
    this.realWs.onerror(...args);
  }

  onclose(...args){
    this.realWs.onclose(...args);
  }
}
