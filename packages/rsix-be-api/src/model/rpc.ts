import { Game, Player, UUID } from '@jsix/be-db/model/data';
import { GameDataTypes } from '@jsix/be-db/model/data/apps';

export interface ApiRPC {
  /**
   * Used to load all players, currently only for testing.
   * @returns players
   */
  loadPlayers: () => Player[];
  /**
   * Selects a player for the frontend to use. Used for testing
   * and generally used after basic auth.
   *
   * @param id player id
   * @returns Player object
   */
  selectPlayer: (id: UUID) => Player;
  /**
   * sets the websocket id for the current session
   * @param wsid  - The WebSocket ID to set for the current session.
   * This method is used to associate a WebSocket connection with the current session.
   * It allows the server to send real-time updates to the client over WebSocket.
   * @returns null
   */
  setWsId: (wsid: UUID) => null;
  getPlayers: (ids: UUID[]) => Promise<Player[]>;
  getGames: (ids: UUID[]) => Promise<Game[]>;
  updateGames: (games: Game[]) => Promise<Game[]>;
  getGameDatas: (ids: UUID[]) => Promise<GameDataTypes[]>;
  updateGameDatas: (data: GameDataTypes[]) => Promise<GameDataTypes[]>;
}

export const RPC_V1 = 'rpc/v1';
