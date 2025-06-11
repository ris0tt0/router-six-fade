import { Initable, Player } from '@jsix/be-db';
import Logger from 'js-logger';
import { SocketServer } from '../ws';

export interface WsCommands extends Initable {
  sendMessage(message: string): Promise<void>;
  sendPlayers(player: Player[]): Promise<void>;
  setPlayer(id: string): Promise<void>;
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
  async sendPlayers(players: Player[]) {
    Logger.info('WsCommandsImpl::sendPlayer', players);
    // const json = JSON.stringify(players);
    this.wss.sendPlayers(players);
    return;
  }
  async setPlayer(id: string) {
    Logger.info('WsCommandsImpl::setPlayer', id);
    // This method is not implemented in the original code.
    // You can add logic here to handle player selection if needed.
    return;
  }
}
