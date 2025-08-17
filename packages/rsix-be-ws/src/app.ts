import { Initable } from '@jsix/be-db/model';
import { ClientDbRpc } from '@jsix/be-db/model/rpc';
import { WsCommands, WsCommandsImpl } from './commands/indext';
import { ExpressServer } from './express';
import { ClientDbRpcImpl } from './rpc/dbClient';
import { ServerRPC } from './rpc/server';
import { SocketServer, SocketServerImpl } from './ws';

class App implements Initable {
  public isInitialized: boolean = false;
  private socketServer: SocketServer;
  private expressServer: ExpressServer;
  private serverRPC: ServerRPC;
  private commands: WsCommands;
  private clientDbRpc: ClientDbRpc;
  constructor() {
    this.clientDbRpc = new ClientDbRpcImpl();
    this.socketServer = new SocketServerImpl(this.clientDbRpc);
    this.commands = new WsCommandsImpl(this.socketServer, this.clientDbRpc);
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

export default App;
