import type { Game, Player, UUID } from '@jsix/be-db/model/data';
import type { Initable } from '@jsix/be-db/model';
import type { RPCFunctions } from '@node-rpc/server';
import { createServer } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { ApiCommands } from '../commands';
import { ApiRPC } from '../model/rpc';
import type { GameDataTypes } from '@jsix/be-db/model/data/apps';

export interface APIContext {
  commands: ApiCommands;
  request: Request;
}

const api: RPCFunctions<ApiRPC, APIContext> = {
  loadPlayers: () => (context: APIContext) => {
    const retVal = new Promise<Player[]>((resolve, reject) => {
      context.commands
        .loadPlayers()
        .then((items) => resolve(items))
        .catch((e) => reject(e));
    });

    return retVal;
  },
  selectPlayer: (id) => (context: APIContext) => {
    const retVal = new Promise<Player>((resolve, reject) => {
      Logger.info('api::selectPlayuer', id, context.request.session);
      if (context.request.session.socketId) {
        const socketId = context.request.session.socketId;
        Logger.info('api::selectPlayuer', socketId);

        Promise.all([
          context.commands.setSocketId(socketId, id),
          context.commands.selectPlayer(id),
        ])
          .then(([, player]) => {
            // save the player in the session
            // context.request.session.playerId = player.id;
            resolve(player);
          })
          .catch((e) => reject(e));
      } else {
        reject('no socketId');
      }
    });
    return retVal;
  },
  setWsId: (id) => (context: APIContext) => {
    const retVal = new Promise<null>((resolve, reject) => {
      context.request.session.socketId = id;
      context.commands.setWsId(id, context.request.session.id);
      resolve(null);
    });
    return retVal;
  },
  getPlayers: (ids: UUID[]) => (context: APIContext) => {
    const retVal = new Promise<Player[]>((resolve, reject) => {
      context.commands.getPlayers(ids).then((players) => resolve(players));
    });
    return retVal;
  },
  getGames: (ids: UUID[]) => (context: APIContext) => {
    const retVal = new Promise<Game[]>((resolve, reject) => {
      context.commands.getGames(ids).then((games) => resolve(games));
    });
    return retVal;
  },
  updateGames: (games: Game[]) => (context: APIContext) => {
    const retVal = new Promise<Game[]>((resolve, reject) => {
      context.commands.updateGames(games).then((games) => resolve(games));
    });

    return retVal;
  },
  getGameDatas: (ids: UUID[]) => (context: APIContext) => {
    const retVal = new Promise<GameDataTypes[]>((resolve, reject) => {
      context.commands.getDatas(ids).then((data) => resolve(data));
    });
    return retVal;
  },
  updateGameDatas: (games: GameDataTypes[]) => (context: APIContext) => {
    const retVal = new Promise<GameDataTypes[]>((resolve, reject) => {
      context.commands.updateDatas(games).then((games) => resolve(games));
    });

    return retVal;
  },
};

export class ServerRPC implements Initable {
  public isInitialized: boolean = false;
  private rpc: any | null = null;
  private commands: ApiCommands;

  constructor(commands: ApiCommands) {
    this.commands = commands;
  }
  async init() {
    Logger.info('ServerRPC::init');
    this.rpc = createServer({
      api,
      deserializer: jsonDeserializer,
    });
    this.isInitialized = true;
    return null;
  }
  async destroy() {
    return null;
  }

  request = async (req: Request, res: Response) => {
    try {
      const result = await this.rpc.handleAPIRequest(req, {
        request: req,
        commands: this.commands,
      });

      await res.send(result);
      return;
    } catch (e) {
      await res.send(res);
      return;
    }
  };
}
