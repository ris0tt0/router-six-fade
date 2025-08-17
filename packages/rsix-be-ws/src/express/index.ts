import { Initable } from '@jsix/be-db/model';
import express, { Router } from 'express';
import Logger from 'js-logger';
import { ServerRPC } from '../rpc/server';
import { RPC_V1 } from '../model/rpc';

const port = process.env.PORT;
export class ExpressServer implements Initable {
  public isInitialized: boolean = false;
  private app: express.Application | null = null;
  private rcpServer: ServerRPC;

  constructor(rcpServer: ServerRPC) {
    this.rcpServer = rcpServer;
  }

  init() {
    const retVal = new Promise<null>((resolve, reject) => {
      const v1Router = Router();

      this.app = express();
      this.app.use(`/${RPC_V1}`, v1Router);

      v1Router.post('/', this.rcpServer.request);

      this.app.listen(port, () => {
        Logger.log(`express on port ${port}`);
        this.isInitialized = true;
        resolve(null);
      });
    });

    return retVal;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }
}
