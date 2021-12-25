/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import Websocket from '../lib/websocket/websocket';
import EventEmitter from '../lib/event_emitter';

const ws = new Websocket(`${location.protocol.includes('https') ? 'wss' : 'ws'}://${location.host}`);
const channels = {};

// global.debug = channels;

const MessageService = {
  init(){
    ws.onmessage((evt) => {
      const { event, payload } = JSON.parse(evt);
      console.log('chat_service.js: onmessage:\n', `event: ${event}`, 'payload: ', payload);
      // console.log(event, payload);
      if (event === 'ON_MESSAGE'){
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
