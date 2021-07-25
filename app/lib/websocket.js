/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import WebSocket from 'ws';

const WS = {
  init(server, path){
    return new WebSocket.Server({ server, path });
  },
};

export default WS;
