import { IApi } from '@jsix/be-api';
import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import express, { Request, Response, Router } from 'express';
import Logger from 'js-logger';
import { Initable } from '../interface';
import { DataBaseSix } from '../db';

const port = process.env.PORT || 5005;

export interface DBContext {
  db: DataBaseSix;
}

export const api: RPCFunctions<IApi, DBContext> = {
  loadPlayers: () => (context) => {
    // const results = context.db.getPlayers().
    return [
      { id: 'a', name: 'jay one', status: 'offlilne' },
      {
        id: 'b',
        name: 'wall',
        description: 'check  one two',
        status: 'offlilne',
      },
    ];
  },
};

const RpcServer = createServer({
  api,
  deserializer: jsonDeserializer,
});

// export const RCPRequest = async (req: Request, res: Response) => {
//   try {
//     // get the accepted language, use "en" as fallback
//     const lang = req.headers['accept-language']?.split(',')?.[0] || 'en';

//     // call the rpc function and pass the additional context
//     const result = await RpcServer.handleAPIRequest(req, { db });

//     // send the result back to the client
//     await res.send(result);
//     return;
//   } catch (e) {
//     await res.send(res);
//     return;
//   }
// };

export class ExpressServer implements Initable {
  private app: express.Application | null = null;
  private db: DataBaseSix;

  constructor(db: DataBaseSix) {
    this.db = db;
  }

  init(): Promise<null> {
    const retVal = new Promise<null>((resolve, reject) => {
      this.app = express();
      const v1Router = Router();
      this.app.use('/api/v1', v1Router);

      v1Router.post('/', this.rcpRequest);

      this.app.listen(port, () => {
        Logger.log(`db on port ${port}`);
        resolve(null);
      });

      return null;
    });

    return retVal;
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
