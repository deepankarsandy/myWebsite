/*
modification history
--------------------
01a,16oct2021,deepankar created
*/

import EventEmitter from 'eventemitter3';

class WSEvent extends EventEmitter {
  emit(name, ...args){
    super.emit(`WS#${name}`, ...args);
  }

  on(name, cb){
    super.on(`WS#${name}`, cb);
  }

  once(name, cb){
    super.once(`WS#${name}`, cb);
  }
}

export default new WSEvent();
