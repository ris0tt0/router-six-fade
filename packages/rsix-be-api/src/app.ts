import Logger from 'js-logger';
import { ExpressServer } from './express';
import { Initable } from '@jsix/be-db';
import { ClientRPC, ClientRPCImpl } from './rpc/client';
import { ServerRPC } from './rpc/server';

Logger.useDefaults();

class App implements Initable {
  private express: ExpressServer;
  private rcpClient: ClientRPC;
  private rcpServer: ServerRPC;

  constructor() {
    this.rcpClient = new ClientRPCImpl();
    this.rcpServer = new ServerRPC(this.rcpClient);
    this.express = new ExpressServer(this.rcpServer, this.rcpClient);
  }

  async init() {
    await this.rcpClient.init();
    await this.rcpServer.init();
    await this.express.init();

    return null;
  }
}

const app = new App();

app
  .init()
  .then(() => Logger.info('App init'))
  .catch((e) => Logger.error(e));
