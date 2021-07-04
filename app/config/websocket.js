/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

const WebSocket = require('ws');

const WS = {
  init(server, path){
    return new WebSocket.Server({ server, path });
  },
};

module.exports = WS;
