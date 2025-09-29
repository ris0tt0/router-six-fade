import type { Initable } from '@jsix/be-db/model';
import type { Game, Player, UUID } from '@jsix/be-db/model/data';
import { StatusOnline } from '@jsix/be-db/model/data';
import type { ChessGameData, GameDataTypes } from '@jsix/be-db/model/data/apps';
import { ChessType } from '@jsix/be-db/model/data/apps';
import type { ClientDbRpc } from '@jsix/be-db/model/rpc';
import Logger from 'js-logger';
import type { ClientWsRpc } from '../rpc/wsClient';

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

  getPlayers(ids: UUID[]): Promise<Player[]>;
  getGames(ids: UUID[]): Promise<Game[]>;
  updateGames(games: Game[]): Promise<Game[]>;
  getDatas(ids: UUID[]): Promise<GameDataTypes[]>;
  updateDatas(games: GameDataTypes[]): Promise<GameDataTypes[]>;
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
  async getPlayers(ids: UUID[]) {
    const players = await this.dbRpc.getPlayers(ids);

    return players;
  }
  async getGames(ids: UUID[]) {
    const games = await this.dbRpc.getGames(ids);

    return games;
  }
  async updateGames(games: Game[]) {
    const result = await this.dbRpc.updateGames(games);

    return result;
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
  async getDatas(ids: UUID[]) {
    const datas = await this.dbRpc.getDatas(ids);
    return datas;
  }
  async updateDatas(games: GameDataTypes[]) {
    const updated = await this.dbRpc.updateDatas(games);
    const ids = [] as UUID[];
    games.map((game) => {
      if (game.type === ChessType) {
        const chessData = game as ChessGameData;
        ids.push(chessData.darkPlayerId);
        ids.push(chessData.lightPlayerId);
      }
    });
    await this.wsRpc.updateGameDatas(ids, updated);
    return updated;
  }
}
