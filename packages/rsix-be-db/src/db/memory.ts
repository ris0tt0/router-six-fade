import { DataBaseSix } from '.';
import { Player } from '../interface';

/**
 * Just a simple in memory data.
 */
export class MemoryDB implements DataBaseSix {
  private db: Record<string, Player> = {};

  async init() {
    return null;
  }
  async addPlayers(players: Player[]): Promise<null> {
    return null;
  }
  async getPlayers(ids: string[]): Promise<Player[]> {
    return [];
  }
  async removePlayers(players: Player[]): Promise<null> {
    return null;
  }
}
