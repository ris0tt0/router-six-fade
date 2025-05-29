import Logger from 'js-logger';
import { SocketServer } from './ws';

Logger.useDefaults();

const socketServer = new SocketServer();

socketServer
  .init()
  .then(() => Logger.info('socket server initialized'))
  .catch((e) => Logger.error(e));
