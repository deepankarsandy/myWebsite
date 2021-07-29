/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

import { WebSocketServer } from 'ws';

const WS = {
  init(server, path){
    return new WebSocketServer({ server, path });
  },
};

export default WS;
