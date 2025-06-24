import { DataBaseSix } from './db';
import { MemoryDB } from './db/memory';
import { ExpressServer } from './server/express';

export class Application {
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
