/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import { isNil } from 'ramda';
import { v4 as uuid4 } from 'uuid';

import EventEmitter from '../../../js/lib/event_emitter.js';
import { WS_SOCKET_EVENTS, WS_CLIENT_ACTIONS } from './ws_constants.js';

/**
 * this is a wrapper around ws client
 * supports channels, channel actions
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
    this.BASE_EVENT_CALLBACKS = new Map();
    WS_SOCKET_EVENTS.forEach((e) => {
      this.BASE_EVENT_CALLBACKS.set(e, new Set());
    });
    this.uuid = uuid4();

    client.on('close', (code, reason) => {
      // this.event.emit('close', code, reason);
      this.BASE_EVENT_CALLBACKS.get('close').forEach((cb) => cb(code, reason));
    });

    client.on('error', (err) => {
      // this.event.emit('error', err);
      this.BASE_EVENT_CALLBACKS.get('error').forEach((cb) => cb(err));
    });

    client.on('message', (data, isBinary) => {
      const {
        action, event, payload
      } = JSON.parse(data);
      let { actionArgs } = JSON.parse(data);

      if (!isNil(actionArgs) && typeof actionArgs !== 'object'){
        actionArgs = { actionArgs };
      }

      if (action){
        switch (action){
          case WS_CLIENT_ACTIONS.joinChannel:
            this.join(...actionArgs);
            break;
          case WS_CLIENT_ACTIONS.leaveChannel:
            this.leave(...actionArgs);
            break;
          case WS_CLIENT_ACTIONS.sendToChannels: // FIX to support multiple channels
            this.to(...actionArgs);
            break;
          case WS_CLIENT_ACTIONS.sendToClients:
            this.to(...actionArgs);
            break;
          default:
            break;
        }
      }

      if (event){
        this.event.emit(event, payload);
        // this.BASE_EVENT_CALLBACKS.get('open').forEach((cb) => cb(...args));
      }
    });

    client.on('open', (...args) => {
      this.BASE_EVENT_CALLBACKS.get('open').forEach((cb) => cb(...args));
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

  /**
   *
   * @param {String|Number} channelId
   * @param {Any} data
   * @param {Hash} options
   * @param {Function} cb
   */
  to(channelId, data, options, cb){
    if (!this.channels.has(channelId)){
      throw new Error(`client not part of channel ${channelId}`);
    }

    const channel = this.channels.get(channelId);

    channel.clients.forEach((cl, id) => {
      cl.send(data, options);
    });

    cb && cb(this);

    return this;
  }

  /**
   *
   * @param {String|Number} clientIds
   * @param {Any} data
   * @param {Hash} options
   * @param {Function} cb
   */
  toClients(clientIds, data, options, cb){
    const clIds = [clientIds].flat();

    clIds.forEach((clId) => {
      if (!this.ws.clients.has(clId)){
        throw new Error(`client  ${clId} doest not exist.`);
      }

      const cl = this.ws.clients.get(clId);
      cl.send(data, options);
    });

    cb && cb(this);

    return this;
  }

  // TODO
  // emit(eventName){
  // }

  /**
   *
   * @param {Any} data
   * @param {Object} options
   * @param {Boolean} options.binary - Specifies whether data should be sent as a binary or not.
   *    Default is auto detected.
   * @param {Boolean} options.compress - Specifies whether data should be compressed or not.
   *    Defaults to true when permessage-deflate is enabled.
   * @param {Boolean} options.fin - Specifies whether data is the last fragment of a message or not.
   *    Defaults to true.
   * @param {Boolean} options.mask - Specifies whether data should be masked or not.
   *    Defaults to true when websocket is not a server client.
   * @param {Function} cb An optional callback which is invoked when data is written out.
   */
  send(data, options, cb){
    this._send(data, options, cb);
  }

  // ---------Base Events-------

  onopen(cb){
    this.BASE_EVENT_CALLBACKS.get('open').add(cb);
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
