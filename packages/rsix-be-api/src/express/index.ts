import { Initable } from '@jsix/be-db';
import express, { Router } from 'express';
import session from 'express-session';
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

      var sessionOptions = {
        secret: 'keyboard cat one 4',
        cookie: {} as { secure: boolean },
        resave: true,
        saveUninitialized: true,
      };

      if (this.app.get('env') === 'production') {
        this.app.set('trust proxy', 1); // trust first proxy
        sessionOptions.cookie.secure = true; // serve secure cookies
      }

      this.app.use(session(sessionOptions));
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
