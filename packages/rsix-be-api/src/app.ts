import { Initable } from '@jsix/be-db/interface';
import { ClientDbRpc } from '@jsix/be-db/interface/rpc';
import { ApiCommands, ApiCommandsImpl } from './commands';
import { ExpressServer } from './express';
import { ClientDbRpcImpl } from './rpc/dbClient';
import { ServerRPC } from './rpc/server';
import { ClientWsRpc, ClientWsRpcImpl } from './rpc/wsClient';

export class App implements Initable {
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
    this.express = new ExpressServer(this.rcpServer);
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
