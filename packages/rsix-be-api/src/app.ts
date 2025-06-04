import Logger from 'js-logger';
import { ExpressServer } from './server/express';

Logger.useDefaults();

const server = new ExpressServer();
server
  .init()
  .then(() => {
    Logger.info('API Express Server started');
  })
  .catch((e) => Logger.error(e));
