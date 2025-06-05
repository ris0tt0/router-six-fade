import Logger from 'js-logger';
import { ExpressServer } from './server/express';
import { DataBaseSix } from './db';
import { MemoryDB } from './db/memory';

Logger.useDefaults();

class Application {
  private express: ExpressServer;
  private database: DataBaseSix;

  constructor() {
    this.database = new MemoryDB();
    this.express = new ExpressServer(this.database);
  }
  async init() {
    await this.database.init();
    await this.express.init();
    return null;
  }
}

const app = new Application();

app
  .init()
  .then(() => Logger.info('db server init'))
  .catch((e) => Logger.error(e));
