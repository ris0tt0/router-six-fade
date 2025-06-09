import { Initable, Player } from '@jsix/be-db';
import Logger from 'js-logger';
import { SocketServer } from '../ws';

export interface WsCommands extends Initable {
  sendMessage(message: string): Promise<void>;
  sendPlayer(player: Player): Promise<void>;
}

export class WsCommandsImpl implements WsCommands {
  private wss: SocketServer;

  constructor(wss: SocketServer) {
    this.wss = wss;
  }
  async init() {
    // Initialization logic if needed
    return null;
  }
  async sendMessage(message: string) {
    Logger.info('WsCommandsImpl::sendMessage', message);
    this.wss.sendMessage(message);
    return;
  }
  async sendPlayer(player: Player) {
    Logger.info('WsCommandsImpl::sendPlayer', player);
    return;
  }
}
