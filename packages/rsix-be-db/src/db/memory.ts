import { UUID } from 'crypto';
import { DataBaseSix } from '.';
import { Game, Player, StatusOffline } from '../interface';

const ID00 = 'aaaa-aaaa-aaaa-aaaa-aaaa';
const ID01 = 'aaaa-aaaa-aaaa-aaaa-aaab';
const ID02 = 'aaaa-aaaa-aaaa-aaaa-aaac';
const ID03 = 'aaaa-aaaa-aaaa-aaaa-aaad';
const ID04 = 'aaaa-aaaa-aaaa-aaaa-aaae';
const ID05 = 'aaaa-aaaa-aaaa-aaaa-aaaf';
const ID06 = 'aaaa-aaaa-aaaa-aaaa-aaba';
const ID07 = 'aaaa-aaaa-aaaa-aaaa-aabb';
const ID08 = 'aaaa-aaaa-aaaa-aaaa-aabc';
const ID09 = 'aaaa-aaaa-aaaa-aaaa-aabd';
const ID10 = 'aaaa-aaaa-aaaa-aaaa-aabe';
const ID11 = 'aaaa-aaaa-aaaa-aaaa-aabf';
const ID12 = 'aaaa-aaaa-aaaa-aaaa-aaca';
const ID13 = 'aaaa-aaaa-aaaa-aaaa-aacb';
const ID14 = 'aaaa-aaaa-aaaa-aaaa-aacc';
const ID15 = 'aaaa-aaaa-aaaa-aaaa-aacd';
const ID16 = 'aaaa-aaaa-aaaa-aaaa-aace';
const ID17 = 'aaaa-aaaa-aaaa-aaaa-aacf';
const ID18 = 'aaaa-aaaa-aaaa-aaaa-aada';
const ID19 = 'aaaa-aaaa-aaaa-aaaa-aadb';
const ID20 = 'aaaa-aaaa-aaaa-aaaa-aadc';
const ID21 = 'aaaa-aaaa-aaaa-aaaa-aadd';
/**
 * Just a simple in memory data.
 */
export class MemoryDB implements DataBaseSix {
  public isInitialized: boolean = false;

  private db: Record<UUID, Player> = {
    [ID00]: {
      name: 'jackson one',
      id: ID00,
      status: StatusOffline,
      gameIds: [],
    },
    [ID01]: {
      name: 'William Gates',
      id: ID01,
      status: StatusOffline,
      gameIds: [],
    },
    [ID02]: { name: 'Mr Gray', id: ID02, status: StatusOffline, gameIds: [] },
    [ID03]: {
      name: 'lilr offline',
      id: ID03,
      status: StatusOffline,
      gameIds: [],
    },
    [ID04]: {
      name: 'FPS Doug',
      id: ID04,
      status: StatusOffline,
      description: 'BOOM head shot!',
      gameIds: [],
    },
    [ID05]: {
      name: 'koterman99',
      id: ID05,
      status: StatusOffline,
      gameIds: [],
    },
    [ID06]: { name: 'joy89', id: ID06, status: StatusOffline, gameIds: [] },
    [ID07]: {
      name: 'blue river73',
      id: ID07,
      status: StatusOffline,
      gameIds: [],
    },
  };

  async init() {
    this.isInitialized = true;
    return null;
  }
  async destroy() {
    this.isInitialized = false;
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
  async getPlayers(ids: UUID[]) {
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
  // games
  async getGames(ids: string[]) {
    return [];
  }
  async getAllGamesForPlayer(id: string) {
    return [];
  }
  async addGames(games: Game[]) {
    return null;
  }
  async removeGames(games: Game[]) {
    return null;
  }
}
