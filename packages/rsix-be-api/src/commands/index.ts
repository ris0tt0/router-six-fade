import { ClientDbRpc, Initable, Player, StatusOnline } from '@jsix/be-db';
import { UUID } from 'crypto';
import Logger from 'js-logger';
import { ClientWsRpc } from '../rpc/wsClient';

export interface ApiCommands extends Initable {
  /**
   * Loads all players from the database.
   * @returns A promise that resolves to an array of Player objects.
   */
  loadPlayers(): Promise<Player[]>;
  /**
   *  Selects the player by their ID and updates their status to 'online'.
   * @param id - The ID of the player to select.
   * @returns A promise that resolves to the selected Player object with updated status.
   * This method fetches the player from the database, updates their status to 'online',
   * and notifies WebSocket clients about the online player.
   */
  selectPlayer(id: UUID): Promise<Player>;
  /**
   * Sets the WebSocket ID for the client session.
   * @param id - The WebSocket ID to set.
   * @param sessionId - The session ID associated with the WebSocket connection.
   */
  setWsId(socketId: UUID, sessionId: string): Promise<void>;
  setSocketId(socketId: UUID, playerId: string): Promise<void>;
}

export class ApiCommandsImpl implements ApiCommands {
  public isInitialized: boolean = false;
  private wsRpc: ClientWsRpc;
  private dbRpc: ClientDbRpc;

  constructor(wsRpc: ClientWsRpc, dbRpc: ClientDbRpc) {
    this.wsRpc = wsRpc;
    this.dbRpc = dbRpc;
  }
  async init() {
    this.isInitialized = true;
    return null;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }
  async loadPlayers() {
    const players = await this.dbRpc.loadPlayers();
    return players;
  }

  async setWsId(socketId: UUID, sessionId: string) {
    await this.wsRpc.setWsId(socketId, sessionId);
    return;
  }
  async setSocketId(socketId: UUID, playerId: string) {
    Logger.info('api::commands::setSocketId', socketId, playerId);

    await this.wsRpc.setPlayerId(socketId, playerId);

    return;
  }
  async selectPlayer(id: UUID) {
    // Fetch the player from the database
    const player = await this.dbRpc.getPlayer(id);
    // update the player status to 'online'
    const onlinePlayer: Player = {
      ...player,
      status: StatusOnline,
    };
    // Update the player status in the database
    await this.dbRpc.setPlayer(onlinePlayer);
    // Notify the WebSocket clients about the online player
    await this.wsRpc.sendPlayers([onlinePlayer]);

    return onlinePlayer;
  }
}
