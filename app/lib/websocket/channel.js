/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

/**
 * WSCChannel class
 * this is a wrapper around ws client
 * supports rooms, client ids, users
 * @param {WSServer} ws ws server
 * @param {String|Number} id channel id
 * @param {String} name channel name. optional
 * @example new WSCChannel(ws, 'chat-group-1', 'The Group')
 */
export default class WSChannel {
  constructor(ws, id, name){
    this.ws = ws;
    this.uuid = id;
    this.channelName = name || id;
    this.CLIENTS = new Map();

    this.delete = this.delete.bind(this);
    this.join = this.join.bind(this);
    this.remove = this.remove.bind(this);
    this.send = this.send.bind(this);
  }

  delete(){
    this.clients.forEach((cl) => {
      cl.leave(this.id);
    });

    this.clients.clear();
  }

  /**
   * joins a client to current channel
   * @param {String|Number} clientId WSClient id
   * @returns {WSChannel} current channel
   */
  join(clientId){
    if (!this.ws.clients.has(clientId)){
      throw new Error(`client '${clientId}' doesn't exist`);
    }

    const client = this.ws.clients.get(clientId);

    this.clients.set(client.id, client);
    client.channels.set(this.id, this);

    return this;
  }

  /**
   * removes client from channel
   * removes current channel from client's channel list
   * @param {String|Number} clientId WSClient id
   * @returns current channel
   */
  remove(clientId){
    if (this.ws.clients.has(clientId)){
      const client = this.ws.clients.get(clientId);

      client.channels.delete(this.id);
    }

    this.clients.delete(clientId);

    return this;
  }

  // TODO
  // onMessage(){
  // }
  // TODO
  // onJoin(){
  // }
  // TODO
  // onLeave(){
  // }

  send(data, options, cb){
    this.clients.forEach((cl) => {
      cl.send(data, options);
    });

    cb && cb(this);
  }

  // ---------internals-------

  // --------- GETTERS -------

  get id(){
    return this.uuid;
  }

  get name(){
    return this.channelName;
  }

  get clients(){
    return this.CLIENTS;
  }

  get clientIds(){
    const clIds = new Set();
    this.clients.forEach((cl) => {
      clIds.add(cl.id);
    });

    return clIds;
  }

  get clientCount(){
    return this.clients.size;
  }
}
