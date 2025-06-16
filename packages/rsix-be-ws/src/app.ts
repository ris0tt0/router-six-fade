import Logger from 'js-logger';
import { SocketServer, SocketServerImpl } from './ws';
import { Initable } from '@jsix/be-db';
import { ExpressServer } from './express';
import { ServerRPC } from './rpc/server';
import { WsCommands, WsCommandsImpl } from './commands/indext';

Logger.useDefaults();

class App implements Initable {
  public isInitialized: boolean = false;
  private socketServer: SocketServer;
  private expressServer: ExpressServer;
  private serverRPC: ServerRPC;
  private commands: WsCommands;

  constructor() {
    this.socketServer = new SocketServerImpl();
    this.commands = new WsCommandsImpl(this.socketServer);
    this.serverRPC = new ServerRPC(this.commands);
    this.expressServer = new ExpressServer(this.serverRPC);
  }
  async init() {
    await this.commands.init();
    await this.serverRPC.init();
    await this.socketServer.init();
    await this.expressServer.init();
    this.isInitialized = true;

    return null;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }
}

const app = new App();

app
  .init()
  .then(() => Logger.info('app initialized'))
  .catch((e) => Logger.error(e));
