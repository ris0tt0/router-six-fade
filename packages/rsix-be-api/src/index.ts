import Logger from 'js-logger';
import { App } from './app';

Logger.useDefaults();

const app = new App();

app
  .init()
  .then(() => Logger.info('api init'))
  .catch((e) => Logger.error('api error', e));
