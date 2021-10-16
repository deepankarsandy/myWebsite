/*
modification history
--------------------
01a,16oct2021,deepankar created
*/

import EventEmitter from 'eventemitter3';

class WSEvent extends EventEmitter {
  constructor(props){
    super(props);

    this.prefix = props.prefix;
    this.suffix = props.suffix;
  }

  emit(name, ...args){
    let eventName = name;
    if (this.prefix){
      eventName = `${this.prefix}${name}`;
    }

    if (this.suffix){
      eventName = `${name}${this.suffix}`;
    }

    super.emit(eventName, ...args);
  }

  on(name, cb){
    let eventName = name;
    if (this.prefix){
      eventName = `${this.prefix}${name}`;
    }

    if (this.suffix){
      eventName = `${name}${this.suffix}`;
    }

    super.on(eventName, cb);
  }

  once(name, cb){
    let eventName = name;
    if (this.prefix){
      eventName = `${this.prefix}${name}`;
    }

    if (this.suffix){
      eventName = `${name}${this.suffix}`;
    }

    super.once(eventName, cb);
  }
}

export default WSEvent;
