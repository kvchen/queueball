// Creates and exports a SocketIO server

import Server from 'socket.io';
import cookie from 'cookie';
import store from 'server/lib/sessionStore';

const io = new Server();


// Attach a session if the user is authenticated

io.use(async function attachSession(socket, next) {
  const sid = cookie.parse(socket.handshake.headers.cookie)['koa.sid'];
  const session = await store.client.get(`koa:sess:${ sid }`);

  socket.session = session;
  next(null, true);
});


module.exports = new Server();
