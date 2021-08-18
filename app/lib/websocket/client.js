/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import { v4 as uuid4 } from 'uuid';

import EventEmitter from '../../../js/lib/event_emitter.js';

/**
 * WSClient class
 * this is a wrapper around ws client
 * supports channels
 * @param {WSServer} ws ws server
 * @param {WebSocket} client original websocket client
 * @see https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket
 * @example new WSClient(ws, client)
 */
export default class WSClient {
  constructor(ws, client){
    this.ws = ws;
    this.client = client;
    this.event = EventEmitter;
    this.CHANNELS = new Map();
    this.uuid = uuid4();

    client.on('close', (code, reason) => {
      this.event.emit('close', code, reason);
    });

    client.on('error', (err) => {
      this.event.emit('error', err);
    });

    client.on('message', (data, isBinary) => {
      const { event, payload } = JSON.parse(data);
      this.event.emit(event, payload);
    });

    client.on('open', () => {
      this.event.emit('open');
    });

    client.on('ping', (...args) => {
      this.event.emit('ping', ...args);
    });

    client.on('pong', (...args) => {
      this.event.emit('pong', ...args);
    });

    client.on('unexpected-response', (...args) => {
      this.event.emit('unexpected-response', ...args);
    });

    client.on('upgrade', (...args) => {
      this.event.emit('upgrade', ...args);
    });
  }

  /**
   * joins current client to channel
   * @param {String|Number} channelId WSChannel id
   * @param {Boolean} createChannel creates channel if not present. default true
   * @returns {WSClient} current client
   */
  join(channelId, createChannel = true){
    let channel;
    if (!this.ws.channels.has(channelId)){
      if (createChannel){
        channel = this.ws.createChannel(channelId);
      } else {
        throw new Error(`channel '${channelId}' doesn't exist`);
      }
    } else {
      channel = this.ws.channels.get(channelId);
    }

    this.channels.set(channel);

    return this;
  }

  /**
   * leaves given channel
   * removes current client from channel's client list
   * @param {String|Number} channelId WSChannel id
   * @returns current client
   */
  leave(channelId){
    if (this.ws.channels.has(channelId)){
      const channel = this.ws.channels.get(channelId);

      channel.clients.delete(this.id);
    }

    this.channels.delete(channelId);

    return this;
  }

  on(eventName, cb){
    this.event.on(eventName, (...args) => cb && cb(...args));
  }

  close(code, reason){
    this.channels.delete(this.id);
    this.ws.channels.delete(this.id);
    return this.client.close(code, reason);
  }

  to(channelId, data, options, cb){
    console.log('send data to all channel members');
    if (!this.channels.has(channelId)){
      throw new Error(`client not part of channel ${channelId}`);
    }

    const channel = this.channels.get(channelId);

    channel.clients.forEach((cl, id) => {
      console.log('sent to: ', id);
      cl.send(data, options);
    });

    cb && cb(this);
  }

  // TODO
  // emit(eventName){
  // }

  send(data, options, cb){
    this._send(data, options, cb);
  }

  // ---------internals-------
  _send(data, options, cb){
    return this.client.send(data, options, cb);
  }

  // --------- GETTERS -------

  get server(){
    return this.ws;
  }

  get channels(){
    return this.CHANNELS;
  }

  get channelIds(){
    const chIds = new Set();
    this.channels.forEach((ch) => {
      chIds.add(ch.id);
    });

    return chIds;
  }

  get id(){
    return this.uuid;
  }
}
