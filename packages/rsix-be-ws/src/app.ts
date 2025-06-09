import Logger from 'js-logger';
import { SocketServer } from './ws';
import { Initable } from '@jsix/be-db';
import { ExpressServer } from './express';
import { ServerRPC } from './rpc/server';

Logger.useDefaults();

class App implements Initable {
  private socketServer: SocketServer;
  private expressServer: ExpressServer;
  private serverRPC: ServerRPC;

  constructor() {
    this.serverRPC = new ServerRPC();
    this.socketServer = new SocketServer();
    this.expressServer = new ExpressServer(this.serverRPC);
  }
  async init() {
    await this.serverRPC.init();
    await this.socketServer.init();
    await this.expressServer.init();

    return null;
  }
}

const app = new App();

app
  .init()
  .then(() => Logger.info('app initialized'))
  .catch((e) => Logger.error(e));

// const socketServer = new SocketServer();

// socketServer
//   .init()
//   .then(() => Logger.info('socket server initialized'))
//   .catch((e) => Logger.error(e));
