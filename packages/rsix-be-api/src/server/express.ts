import express, { Router } from 'express';
import Logger from 'js-logger';
import { RCPRequest } from '../request';

const port = process.env.PORT || 5004;
export class ExpressServer {
  private app: express.Application | null = null;

  init() {
    const retVal = new Promise<null>((resolve, reject) => {
      const v1Router = Router();

      this.app = express();
      this.app.use('/api/v1', v1Router);

      v1Router.post('/', RCPRequest);

      this.app.listen(port, () => {
        Logger.log(`express on port ${port}`);
        resolve(null);
      });
    });

    return retVal;
  }
}
