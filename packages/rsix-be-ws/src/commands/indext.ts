import { ClientDbRpc, Initable, Player } from '@jsix/be-db';
import { UUID } from 'crypto';
import Logger from 'js-logger';
import { SocketServer } from '../ws';

export interface WsCommands extends Initable {
  sendMessage(message: string): Promise<void>;
  sendPlayers(player: Player[]): Promise<void>;
  setPlayer(id: string): Promise<void>;
  setPlayerIdSocketId({
    socketId,
    playerId,
  }: {
    socketId: UUID;
    playerId: string;
  }): Promise<void>;
  setSessionIdSocketId({
    socketId,
    sessionId,
  }: {
    socketId: UUID;
    sessionId: string;
  }): Promise<void>;
}

export class WsCommandsImpl implements WsCommands {
  public isInitialized: boolean = false;
  private wss: SocketServer;
  private dbRpc: ClientDbRpc;

  constructor(wss: SocketServer, dbRpc: ClientDbRpc) {
    this.wss = wss;
    this.dbRpc = dbRpc;
  }
  async init() {
    await this.dbRpc.init();
    this.isInitialized = false;
    return null;
  }
  async destroy() {
    this.isInitialized = false;
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
  async setPlayerIdSocketId(param: { socketId: UUID; playerId: string }) {
    return this.wss.setPlayerIdSocketId(param);
  }
  async setSessionIdSocketId(param: { socketId: UUID; sessionId: string }) {
    return this.wss.setSessionIdSocketId(param);
  }
}
