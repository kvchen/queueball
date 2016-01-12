import redisStore from 'koa-redis';
import logger from 'server/lib/logger';

const store = redisStore();

store.on('connect', function connect() {
  logger.debug('Connected to Redis session store');
});

store.on('disconnect', function disconnect() {
  logger.error('Disconnected from Redis session store');
});

module.exports = store;
