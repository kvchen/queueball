// Listeners for the streaming API.

import config from 'server/config';
import logger from 'server/lib/logger';
import io from 'server/lib/socketio';

import Assignment from 'server/models/assignment';
import Ticket from 'server/models/ticket';
import User from 'server/models/user';


// import { getMetric } from 'app/controllers/metrics';
const connectedUsers = {};


io.on('connect', async function connect(socket) {
  const [assignments, tickets, currentUser] = await Promise.all([
    Assignment.getActive(),
    Ticket.getActive(),
    new User({ id: socket.session.passport.user }).fetch(),
  ]);

  const state = { assignments, tickets, connectedUsers, currentUser };

  if (currentUser) {
    state.currentUser = currentUser;
    connectedUsers[currentUser.get('id')] = currentUser;
    logger.info(`${ currentUser.get('name') } connected`);
  }

  socket.on('disconnect', function disconnect() {
    if (currentUser) {
      delete connectedUsers[currentUser.get('id')];
      logger.info(`${ currentUser.get('name')} disconnected`);
    }
  });

  socket.emit('refresh_state', state);
});


// if (metricsConfig.enabled) {
//   setInterval(async function logMetrics() {
//     const metric = await getMetric();
//     await metric.save();
//     wss.broadcast(metric.toJSON());
//   }, metricsConfig.sampleDelay);
// }
