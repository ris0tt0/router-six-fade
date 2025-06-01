import express, { Router } from 'express';
import Logger from 'js-logger';
import { Initable } from '../interface/initable';

const port = process.env.PORT || 5005;
export class ExpressServer implements Initable {
  private app: express.Application | null = null;

  async init() {
    this.app = express();
    const v1Router = Router();
    this.app.use('/api/v1', v1Router);

    this.app.listen(port, () => {
      Logger.log(`db listening on port ${port}`);
    });

    return null;
  }
}
