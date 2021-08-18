/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import { WebSocketServer } from 'ws';
import { mergeRight } from 'ramda';
import EventEmitter from '../../../js/lib/event_emitter.js';

import { STATE_CODE } from './ws_constants.js';
import WSClient from './client.js';
import WSChannel from './channel.js';

/**
 * WSServer class
 * this is a wrapper around ws server
 * supports channels, clients (as nodes)
 * @param {Hash} wsServerOpts WebsocketServer options
 * @see https://github.com/websockets/ws for more props
 * @param {Hash} otherOptions more options [doc TODO]
 * @example new WSServer({ server: fastify.server }, { pingDelay: 5000 })
 */
export default class WSServer extends WebSocketServer {
  constructor(wsServerOpts, otherOptions){
    super(wsServerOpts);
    const defaultOptions = {
      pingDelay:   30 * 1000,
    };

    const options = mergeRight(defaultOptions, otherOptions);

    // this.event = EventEmitter;
    this.CHANNELS = new Map();
    this.CLIENTS = new Map();
  }

  on(eventName, cb){
    switch (eventName){
      case 'connection':
        super.on('connection', (socket, req) => {
          const client = new WSClient(this, socket);
          this.nodes.set(client.id, client);
          cb(client, req);
        });
        break;
      default:
        break;
    }
  }

  /**
   * creates a new channel
   * @param {Number|String} channelId uniq channel id
   * @param {String} [channelName] optional.
   * @returns {WSChannel} created channel
   */
  createChannel(channelId, channelName){
    if (this.channels.has(channelId)){
      return this.channels.get(channelId);
    }

    const channel = new WSChannel(this, channelId, channelName);

    this.channels.set(channel.id, channel);

    return channel;
  }

  // ---------INTERNALS--------

  // --------- GETTERS -------

  get _origNodes(){
    return super.clients;
  }

  get channels(){
    return this.CHANNELS;
  }

  get nodes(){
    return this.CLIENTS;
  }

  get channelIds(){
    const chIds = new Set();
    this.channels.forEach((ch) => {
      chIds.add(ch.id);
    });

    return chIds;
  }

  get clientIds(){
    const clIds = new Set();
    this.nodes.forEach((cl) => {
      clIds.add(cl.id);
    });

    return clIds;
  }

  get state(){
    return STATE_CODE[this.readyState];
  }

  get connected(){
    return this.readyState === 1;
  }
}
