import { Initable } from '@jsix/be-db';
import express, { Router } from 'express';
import Logger from 'js-logger';
import { ClientDbRpc } from '../rpc/dbClient';
import { ServerRPC } from '../rpc/server';

const port = process.env.PORT || 5004;
export class ExpressServer implements Initable {
  private app: express.Application | null = null;
  private rcpServer: ServerRPC;
  private rcpClient: ClientDbRpc;

  constructor(rcpServer: ServerRPC, rcpClient: ClientDbRpc) {
    this.rcpClient = rcpClient;
    this.rcpServer = rcpServer;
  }

  init() {
    const retVal = new Promise<null>((resolve, reject) => {
      const v1Router = Router();

      this.app = express();
      this.app.use('/api/v1', v1Router);

      v1Router.post('/', this.rcpServer.request);

      this.app.listen(port, () => {
        Logger.log(`express on port ${port}`);
        resolve(null);
      });
    });

    return retVal;
  }
}
