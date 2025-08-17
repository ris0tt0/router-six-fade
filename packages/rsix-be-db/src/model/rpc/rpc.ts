import { Initable } from '..';
import { Game, UUID } from '../data';
import { GameDataTypes } from '../data/apps';
import { Player } from '../data/player';

export const RPC_V1 = 'rpc/v1';

/**
 * Database RPC
 */
export interface DbRPC {
  getAllPlayers: () => Player[];
  selectPlayer: (id: UUID) => Player;
  getPlayers: (ids: UUID[]) => Player[];
  getGames: (ids: UUID[]) => Game[];
  updateGames: (games: Game[]) => Game[];
  updatePlayers: (players: Player[]) => null;
  getDatas: (ids: UUID[]) => GameDataTypes[];
  updateDatas: (data: GameDataTypes[]) => GameDataTypes[];
}

export interface ClientDbRpc extends Initable {
  loadPlayers(): Promise<Player[]>;
  getPlayer(id: UUID): Promise<Player>;
  getPlayers: (ids: UUID[]) => Promise<Player[]>;
  setPlayer(player: Player): Promise<Player>;
  //
  getGames: (ids: UUID[]) => Promise<Game[]>;
  updateGames: (games: Game[]) => Promise<Game[]>;
  getDatas: (ids: UUID[]) => Promise<GameDataTypes[]>;
  updateDatas: (data: GameDataTypes[]) => Promise<GameDataTypes[]>;
}
