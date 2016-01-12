import 'app-module-path/register';

import server from 'server';
import config from 'server/config';
import logger from 'server/lib/logger';


server.listen(config.server.port, () => {
  logger.debug(`Server listening on port ${ config.server.port }`);
});
