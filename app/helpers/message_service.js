/*
modification history
--------------------
01a,04jul2021,deepankar created
*/

let SERVER = null;

const MessageService = {
  init(server){
    SERVER = server;

    SERVER.on('connection', (userSocket, req) => {
      console.log('event: connection');
      console.log('ip: ', req.socket.remoteAddress);
      // console.log(userSocket);

      userSocket.on('ON_MESSAGE', (payload) => {
        console.log('event: ON_MESSAGE');
        // console.log(payload);
        // const { event, payload } = JSON.parse(payload);

        const { channelId } = payload;
        try {
          userSocket.to({
            channelId,
            data: JSON.stringify({
              event:   'ON_MESSAGE',
              payload: { userName: userSocket.name, userId: userSocket.id, ...payload }
            })
          });
        } catch (error){
          console.log(error);
        }
      });
    });
  },
};

export default MessageService;
