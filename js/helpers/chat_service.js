/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import Websocket from '../lib/websocket/websocket';
import EventEmitter from '../lib/event_emitter';

const ws = new Websocket(`${location.protocol.includes('https') ? 'wss' : 'ws'}://${location.host}`);
let uuid = null;
const channels = {};

// global.debug = channels;

const MessageService = {
  init(){
    ws.onmessage((evt) => {
      const { event, payload } = JSON.parse(evt);
      console.log('chat_service.js: onmessage:\n', `event: ${event}`, 'payload: ', payload);
      // console.log(event, payload);
      if (event === 'connected'){
        uuid = payload.uuid;
      }
      if (event === 'MESSAGE'){
        payload.createdAt = new Date();
        channels[payload.channelId].messages.push(payload);
        EventEmitter.emit(event);
      }
      if (event === 'CHANNEL'){
        channels[payload.id] = payload;
        channels[payload.id].messages = [];
        EventEmitter.emit(event, payload);
      }
    });
  },

  joinChannel(channelId, user){
    ws.send(JSON.stringify({
      event:   'JOIN_CHANNEL',
      payload: { channelId, user: { id: uuid, ...user } }
    }));
  },

  leaveChannel(channelId, user){
    ws.send(JSON.stringify({
      event:   'LEAVE_CHANNEL',
      payload: { channelId, user: { id: uuid, ...user } }
    }));
  },

  send(channelId, text){
    ws.send(JSON.stringify({ event: 'MESSAGE', payload: { channelId, userId: uuid, text } }));
  },

  messages(channelId){
    return channels[channelId].messages || [];
  },

  channels,

  getUser(channelId, userId){
    const channel = channels[channelId] || { users: [] };

    return channel.users.find((u) => u.id === userId);
  }
};

export default MessageService;
