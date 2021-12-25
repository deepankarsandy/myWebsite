/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import Websocket from '../lib/websocket/websocket';
import EventEmitter from '../lib/event_emitter';

const ws = new Websocket(`${location.protocol.includes('https') ? 'wss' : 'ws'}://${location.host}`);
const channels = {};
const channelIds = new Set();

// global.debug = channels;

const MessageService = {
  init(){
    ws.on('ON_MESSAGE', (payload) => {
      payload.createdAt = new Date();
      channels[payload.channelId].messages.push(payload);
      EventEmitter.emit('NEW_MESSAGE');
    });
    ws.on('CHANNEL', (payload) => {
      channels[payload.id] = payload;
      channels[payload.id].messages = [];
      EventEmitter.emit('CHANNEL_CREATED', payload);
    });

    ws.on('RECONNECT', () => {
      channelIds.forEach((id) => {
        this.joinChannel(id);
      });
    });
  },

  joinChannel(channelId, user){
    channelIds.add(channelId);

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

  send(channelId, text){
    ws.send(JSON.stringify({ event: 'ON_MESSAGE', payload: { channelId, text } }));
  },

  messages(channelId){
    return channels[channelId].messages || [];
  },

  channels,
};

export default MessageService;
