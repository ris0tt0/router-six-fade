import { Initable, Player } from '../interface';

export interface DataBaseSix extends Initable {
  getPlayers(ids: string[]): Promise<Player[]>;
  addPlayers(players: Player[]): Promise<null>;
  removePlayers(players: Player[]): Promise<null>;
}
