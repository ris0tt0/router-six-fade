import { DataBaseSix } from '.';
import { Player } from '../interface';

/**
 * Just a simple in memory data.
 */
export class MemoryDB implements DataBaseSix {
  private db: Record<string, Player> = {
    aa: {
      name: 'jackson one',
      id: 'aa',
      status: 'offline',
    },
    nn: { name: 'William Gates', id: 'bb', status: 'offline' },
    cc: { name: 'teh Pwnerer', id: 'cc', status: 'offline' },
    dd: { name: 'Mr Gray', id: 'dd', status: 'online' },
    ee: { name: 'Mr offline', id: 'ee', status: 'invisible' },
  };

  async init() {
    return null;
  }
  async getAllPlayers() {
    const results = Object.values(this.db);

    return results;
  }
  async addPlayers(players: Player[]) {
    players.map((player) => {
      this.db[player.id] = player;
    });

    return null;
  }
  async getPlayers(ids: string[]) {
    const result = ids.reduce((retVal, id) => {
      const player = this.db[id] ?? null;
      if (player !== null) {
        retVal.push(player);
      }

      return retVal;
    }, [] as Player[]);

    return result;
  }
  async removePlayers(players: Player[]) {
    return null;
  }
}
