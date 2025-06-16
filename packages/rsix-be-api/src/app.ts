import Logger from 'js-logger';
import { ExpressServer } from './express';
import { Initable } from '@jsix/be-db';
import { ClientDbRpc, ClientDbRpcImpl } from './rpc/dbClient';
import { ServerRPC } from './rpc/server';
import { ClientWsRpc, ClientWsRpcImpl } from './rpc/wsClient';
import { ApiCommands, ApiCommandsImpl } from './commands';

Logger.useDefaults();

class App implements Initable {
  public isInitialized: boolean = false;
  private express: ExpressServer;
  private dbClient: ClientDbRpc;
  private wsClient: ClientWsRpc;
  private rcpServer: ServerRPC;
  private commands: ApiCommands;

  constructor() {
    this.wsClient = new ClientWsRpcImpl();
    this.dbClient = new ClientDbRpcImpl();
    this.commands = new ApiCommandsImpl(this.wsClient, this.dbClient);
    this.rcpServer = new ServerRPC(this.commands);
    this.express = new ExpressServer(this.rcpServer, this.dbClient);
  }

  async init() {
    await this.dbClient.init();
    await this.wsClient.init();
    await this.rcpServer.init();
    await this.express.init();

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
  .then(() => Logger.info('App init'))
  .catch((e) => Logger.error(e));
