import Logger from 'js-logger';
import { Application } from './app';

Logger.useDefaults();

const app = new Application();

app
  .init()
  .then(() => Logger.info('db server init'))
  .catch((e) => Logger.error(e));
