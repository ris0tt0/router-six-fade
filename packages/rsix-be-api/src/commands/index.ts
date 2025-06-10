import { Initable, OnlineStatus, Player } from '@jsix/be-db';
import { ClientDbRpc } from '../rpc/dbClient';
import { ClientWsRpc } from '../rpc/wsClient';

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
    // Fetch the player from the database
    const player = await this.dbRpc.getPlayer(id);
    // update the player status to 'online'
    const onlinePlayer: Player = {
      ...player,
      status: 'online' as OnlineStatus,
    };

    // Update the player status in the database
    await this.dbRpc.setPlayer(onlinePlayer);
    // Notify the WebSocket clients about the online player
    await this.wsRpc.sendPlayers([onlinePlayer]);

    return onlinePlayer;
  }
}
