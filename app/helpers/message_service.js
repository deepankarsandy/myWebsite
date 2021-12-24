/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

const CHANNELS = new Map();
const USERS = new Map();
let SERVER = null;

const MessageService = {
  init(server){
    SERVER = server;

    SERVER.on('connection', (userSocket, req) => {
      console.log('event: connection');
      console.log('ip: ', req.socket.remoteAddress);
      // console.log(userSocket);
      const ip = req.socket.remoteAddress;
      userSocket.send(JSON.stringify({ event: 'connected', payload: { uuid: userSocket.id } }));
      this.addUser(userSocket.id, userSocket);

      userSocket.on('JOIN_CHANNEL', (data) => {
        console.log('event: JOIN_CHANNEL');
        console.log(data);
        const { channelId, user } = data;
        this.addUserToChannel(channelId, { ...user, ip, ws: userSocket }, true);

        const users = this.getChannelUsers(channelId);

        const userData = users.map((u) => ({
          id:   u.id,
          name: u.name,
        }));

        userSocket.send(JSON.stringify({
          event:   'CHANNEL',
          payload: { id: channelId, users: userData }
        }));
      });

      userSocket.on('LEAVE_CHANNEL', (data) => {
        console.log('event: LEAVE_CHANNEL');
        console.log(data);
        const { channelId, user } = data;
        this.removeUserFromChannel(channelId, { ...user, ws: userSocket }, true);
      });

      userSocket.on('MESSAGE', (payload) => {
        console.log('event: MESSAGE');
        console.log(payload);
        // const { event, payload } = JSON.parse(payload);

        const { channelId } = payload;
        const users = this.getChannelUsers(channelId);
        users.forEach((u) => {
          u.ws.send(JSON.stringify({
            event: 'CUSTOM_EVENT',
            payload
          }));
        });
      });
    });
  },

  // Channels
  channels:        CHANNELS,
  channelCount:    CHANNELS.size,
  hasChannel(id){ return CHANNELS.has(id); },
  deleteChannel(channelId, disconnectUsers = false){
    if (!this.hasChannel(channelId)) return true;

    if (disconnectUsers){
      const users = this.getChannelUsers(channelId);

      users.forEach((u) => {
        u.ws?.terminate();
      });
    }

    return CHANNELS.delete(channelId);
  },
  getChannel(id){ return CHANNELS.get(id); },
  addChannel(channelId, value){
    if (this.hasChannel(channelId)){
      throw new Error(`channel ${channelId} already exists`);
    }

    CHANNELS.set(channelId, value);
  },

  // Users
  users:           USERS,
  userCount:       USERS.size,
  hasUser(id){ return USERS.has(id); },
  deleteUser(userId){
    if (!this.hasUser(userId)) return true;

    this.getUser(userId)?.terminate();
    return USERS.delete(userId);
  },
  getUser(id){ return CHANNELS.get(id); },
  addUser(userId, value){
    if (this.hasUser(userId)){
      throw new Error(`user ${userId} already exists`);
    }

    USERS.set(userId, value);
  },

  // Channel users
  channelUserCount(channelId){
    if (!this.hasChannel(channelId)){
      throw new Error(`channel ${channelId} doesn't already exist`);
    }

    return this.getChannel(channelId).members?.size || 0;
  },

  getChannelUsers(channelId){
    if (!this.hasChannel(channelId)){
      return [];
    }

    return this.getChannel(channelId).users;
  },

  addUserToChannel(channelId, user, createChannelWhenNotPresent = false){
    if (!createChannelWhenNotPresent && !this.hasChannel(channelId)){
      throw new Error(`channel ${channelId} doesn't already exist`);
    }

    if (!this.hasChannel(channelId)){
      return this.addChannel(channelId, { users: [user] });
    }

    const channel = this.getChannel(channelId);
    return channel.users.push(user);
  },

  removeUserFromChannel(channelId, user, deleteChannelWhenEmpty = true){
    if (!this.hasChannel(channelId)){
      return true;
    }

    const channel = this.getChannel(channelId);
    const users = channel.users.filter((u) => u.id !== user.id);

    if (!users && deleteChannelWhenEmpty){
      return this.deleteChannel(channelId);
    }

    channel.users = users;

    return true;
  }
};

export default MessageService;
