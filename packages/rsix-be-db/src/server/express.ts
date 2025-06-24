import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import express, { Request, Response, Router } from 'express';
import Logger from 'js-logger';
import { DataBaseSix } from '../db';
import { Initable } from '../interface';
import { Game, UUID } from '../interface/data';
import { DbRPC, RPC_V1 } from '../interface/rpc';
import { GameDataTypes } from '../interface/data/apps';

const port = process.env.PORT || 5005;

export interface DBContext {
  db: DataBaseSix;
}

export const api: RPCFunctions<DbRPC, DBContext> = {
  getAllPlayers: () => (context) => {
    return context.db.getAllPlayers();
  },
  selectPlayer: (id) => async (context) => {
    const player = await context.db.getPlayers([id]);

    return player[0];
  },
  getPlayers: (ids: UUID[]) => async (context) => {
    const players = await context.db.getPlayers(ids);

    return players;
  },
  getGames: (ids: UUID[]) => async (context) => {
    const games = await context.db.getGames(ids);

    return games;
  },
  updateGames: (ids: Game[]) => async (context) => {
    const games = await context.db.updateGames(ids);

    return games;
  },
  updatePlayers: (players) => async (context) => {
    await context.db.addPlayers(players);

    return null;
  },
  getDatas: (ids: UUID[]) => async (context) => {
    const data = await context.db.getDatas(ids);

    return data;
  },
  updateDatas: (datas: GameDataTypes[]) => async (context) => {
    const data = await context.db.updateDatas(datas);

    return data;
  },
};

const RpcServer = createServer({
  api,
  deserializer: jsonDeserializer,
});

export class ExpressServer implements Initable {
  public isInitialized: boolean = false;
  private app: express.Application | null = null;
  private db: DataBaseSix;

  constructor(db: DataBaseSix) {
    this.db = db;
  }

  init(): Promise<null> {
    const retVal = new Promise<null>((resolve, reject) => {
      this.app = express();
      const v1Router = Router();
      this.app.use(`/${RPC_V1}`, v1Router);

      v1Router.post('/', this.rcpRequest);

      this.app.listen(port, () => {
        Logger.log(`db on port ${port}`);
        this.isInitialized = true;
        resolve(null);
      });

      return null;
    });

    return retVal;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }

  rcpRequest = async (req: Request, res: Response) => {
    try {
      // get the accepted language, use "en" as fallback
      const lang = req.headers['accept-language']?.split(',')?.[0] || 'en';

      // call the rpc function and pass the additional context
      const result = await RpcServer.handleAPIRequest(req, { db: this.db });

      // send the result back to the client
      await res.send(result);
      return;
    } catch (e) {
      await res.send(res);
      return;
    }
  };
}
