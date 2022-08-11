/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import Websocket from '../lib/websocket/websocket';
import EventEmitter from '../lib/event_emitter';

const ws = new Websocket(`${location.protocol.includes('https') ? 'wss' : 'ws'}://${location.host}`);
const CHANNELS = new Map();
const MESSAGES = new Map();
window.ch = CHANNELS;

const MessageService = {
  init(){
    ws.on('ON_MESSAGE', (payload) => {
      payload.createdAt = new Date();
      payload.id ||= new Date(payload.createdAt).getTime();
      this.addMessages(payload.channelId, payload);
      EventEmitter.emit('NEW_MESSAGE');
    });

    ws.on('CHANNEL', (payload) => {
      CHANNELS.set(payload.id, payload);
      EventEmitter.emit('CHANNEL_CREATED', CHANNELS.get(payload.id));
    });

    ws.on('RECONNECT', () => {
      CHANNELS.forEach((_, id) => {
        this.joinChannel(id);
      });
    });
  },

  joinChannel(channelId, user){
    CHANNELS.set(channelId, new Map());

    ws.send(JSON.stringify({
      action:     'JOIN_CHANNEL',
      actionArgs: { channelId, user: { id: ws.id, ...user } }
    }));
  },

  leaveChannel(channelId, user){
    ws.send(JSON.stringify({
      action:     'LEAVE_CHANNEL',
      actionArgs: { channelId, user: { id: ws.id, ...user } }
    }));
  },

  /**
   * add messages to store
   * @param {Number|String} channelId
   * @param {Object|Array<Object>} messages
   */
  addMessages(channelId, messages){
    const channelData = MESSAGES.get(channelId)
      || MESSAGES.set(channelId, new Map()).get(channelId);

    [messages].flat().forEach((m) => {
      channelData.set(m.id, m);
    });
  },

  send(channelId, text){
    ws.send(JSON.stringify({ event: 'ON_MESSAGE', payload: { channelId, text } }));
  },

  /**
   *
   * @param {Number|String} channelId
   * @returns {Array<Object>} messages
   */
  messages(channelId){
    return Array.from(MESSAGES.get(channelId)?.values() || []);
  },

  get channels(){
    return Array.from(CHANNELS.values());
  },
};

export default MessageService;
