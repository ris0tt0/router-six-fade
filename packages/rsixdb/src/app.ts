import Logger from 'js-logger';
import { ExpressServer } from './server/express';

Logger.useDefaults();

class Application {
  private express: ExpressServer;
  constructor() {
    this.express = new ExpressServer();
  }
  async init() {
    await this.express.init();
    return null;
  }
}

const app = new Application();

app
  .init()
  .then(() => Logger.info('db server init'))
  .catch((e) => Logger.error(e));
