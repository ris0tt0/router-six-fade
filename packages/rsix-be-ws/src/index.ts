import 'dotenv/config';
import Logger from 'js-logger';
import App from './app';

Logger.useDefaults();

const app = new App();

app
  .init()
  .then(() => Logger.info('ws initialized'))
  .catch((e) => Logger.error(e));
