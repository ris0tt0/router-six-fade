import { DataBaseSix } from '.';
import { UUID } from '../interface/data';
import { GameDataTypes } from '../interface/data/apps';
import { ChessType } from '../interface/data/apps/chess';
import { Game } from '../interface/data/game';
import { StatusOffline } from '../interface/data/online';
import { Player } from '../interface/data/player';

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

  private db: Record<UUID, Player | Game | GameDataTypes> = {
    // games
    [ID08]: {
      id: ID08,
      title: 'game one two',
      description: 'this is a chess game between two foes.',
      ownerIds: [ID00, ID01],
      playerIds: [ID00, ID01],
      dataId: ID10,
    },
    [ID10]: {
      id: ID10,
      lightPlayerId: ID00,
      darkPlayerId: ID01,
      activePlayerId: ID00,
      type: ChessType,
      moves: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
    },
    [ID09]: {
      id: ID09,
      title: 'testing one three',
      description: 'we have another game here yo',
      ownerIds: [ID00, ID01],
      playerIds: [ID00, ID01],
      dataId: ID11,
    },
    [ID11]: {
      id: ID11,
      lightPlayerId: ID01,
      darkPlayerId: ID00,
      activePlayerId: ID01,
      type: ChessType,
      moves: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
    },
    // players
    [ID00]: {
      name: 'jackson one',
      id: ID00,
      status: StatusOffline,
      gameIds: [ID08, ID09],
    },
    [ID01]: {
      name: 'William Gates',
      id: ID01,
      status: StatusOffline,
      gameIds: [ID08, ID09],
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
    const ids: UUID[] = [ID00, ID01, ID02, ID03, ID04, ID05, ID06, ID07];

    const results = this.getPlayers(ids);

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
      const player = (this.db[id] ?? null) as Player;
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
  async getGames(ids: UUID[]) {
    const result = ids.reduce((retVal, id) => {
      const game = (this.db[id] ?? null) as Game;
      if (game !== null) {
        retVal.push(game);
      }

      return retVal;
    }, [] as Game[]);

    return result;
  }
  async updateGames(games: Game[]) {
    const result = games.reduce((retVal, game) => {
      const data = (this.db[game.id] ?? null) as Game;

      if (data !== null) {
        const result = { ...data, ...game };
        this.db[result.id] = result;
        retVal.push(result);
      }

      return retVal;
    }, [] as Game[]);

    return result;
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
  async getDatas(ids: UUID[]) {
    const result = ids.reduce((retVal, id) => {
      const data = this.db[id] as GameDataTypes;
      if (data) {
        retVal.push(data);
      }
      return retVal;
    }, [] as GameDataTypes[]);
    return result;
  }
  async updateDatas(datas: GameDataTypes[]) {
    const result = datas.reduce((retVal, data) => {
      if (this.db[data.id]) {
        const updated = { ...this.db[data.id], ...data };

        this.db[data.id] = updated;
        retVal.push(updated);
      } else {
        this.db[data.id] = data;
        retVal.push(data);
      }

      return retVal;
    }, [] as GameDataTypes[]);

    return result;
  }
}
