import { Initable, OnlineStatus, Player } from '@jsix/be-db';
import { ClientDbRpc } from '../rpc/dbClient';
import { ClientWsRpc } from '../rpc/wsClient';
import Logger from 'js-logger';

export interface ApiCommands extends Initable {
  loadPlayers(): Promise<Player[]>;
  selectPlayer(id: string): Promise<Player>;
}

export class ApiCommandsImpl implements ApiCommands {
  private wsRpc: ClientWsRpc;
  private dbRpc: ClientDbRpc;

  constructor(wsRpc: ClientWsRpc, dbRpc: ClientDbRpc) {
    this.wsRpc = wsRpc;
    this.dbRpc = dbRpc;
  }
  async init() {
    // Initialization logic if needed
    return null;
  }

  async loadPlayers() {
    const players = await this.dbRpc.loadPlayers();
    return players;
  }

  async selectPlayer(id: string) {
    Logger.info('ApiCommandsImpl::selectPlayer1', id);
    const player = await this.dbRpc.getPlayer(id);
    Logger.info('ApiCommandsImpl::selectPlayer2', id);
    const onlinePlayer = {
      ...player,
      status: 'online' as OnlineStatus,
    };
    Logger.info('ApiCommandsImpl::selectPlayer3', onlinePlayer);
    // await this.dbRpc.updatePlayer(onlinePlayer);

    await this.wsRpc.sendMessage(onlinePlayer.id);
    Logger.info('ApiCommandsImpl::selectPlayer4', id);
    return player;
  }
}
