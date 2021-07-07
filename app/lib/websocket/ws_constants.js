const STATE_CODE = {
  0: 'CONNECTING', // Socket has been created. The connection is not yet open.
  1: 'OPEN', // The connection is open and ready to communicate.
  2: 'CLOSING', // The connection is in the process of closing.
  3: 'CLOSED', // The connection is closed or couldn't be opened.
};

const ORIG_WS_SERVER_EVENTS = ['close', 'connection', 'error', 'headers', 'listening'];

const WS_SERVER_EVENTS = [...ORIG_WS_SERVER_EVENTS, 'connect', 'connecting', 'disconnect', 'disconnecting', 'open'];

const ORIG_WS_SOCKET_EVENTS = ['close', 'error', 'message', 'open', 'ping', 'pong', 'unexpected-response', 'upgrade'];

const WS_SOCKET_EVENTS = [...ORIG_WS_SOCKET_EVENTS];

// custom implementation
const WS_CLIENT_ACTIONS = {
  joinChannel:    'JOIN_CHANNEL',
  leaveChannel:   'LEAVE_CHANNEL',
  sendToChannels: 'SEND_TO_CHANNELS',
  sendToClients:  'SEND_TO_CLIENTS'
};

export {
  STATE_CODE,
  WS_SERVER_EVENTS,
  WS_SOCKET_EVENTS,
  WS_CLIENT_ACTIONS,
};
