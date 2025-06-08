import Logger from 'js-logger';
import { ExpressServer } from './express';
import { Initable } from '@jsix/be-db';
import { ClientDbRpc, ClientDbRpcImpl } from './rpc/client';
import { ServerRPC } from './rpc/server';
import { ClientWsRpc, ClientWsRpcImpl } from './rpc/wsClient';

Logger.useDefaults();

class App implements Initable {
  private express: ExpressServer;
  private rcpClient: ClientDbRpc;
  private rcpServer: ServerRPC;
  private wsRcpClient: ClientWsRpc;

  constructor() {
    this.wsRcpClient = new ClientWsRpcImpl();
    this.rcpClient = new ClientDbRpcImpl(this.wsRcpClient);
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
