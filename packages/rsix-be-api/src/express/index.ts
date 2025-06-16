import { ClientDbRpc, Initable } from '@jsix/be-db';
import express, { Router } from 'express';
import session from 'express-session';
import Logger from 'js-logger';
import { ServerRPC } from '../rpc/server';

const port = process.env.PORT || 5004;

export class ExpressServer implements Initable {
  public isInitialized: boolean = false;
  private app: express.Application | null = null;
  private rcpServer: ServerRPC;
  private rcpClient: ClientDbRpc;

  constructor(rcpServer: ServerRPC, rcpClient: ClientDbRpc) {
    this.rcpClient = rcpClient;
    this.rcpServer = rcpServer;
  }

  init() {
    const retVal = new Promise<null>((resolve, reject) => {
      const v1RpcRouter = Router();
      const v1ApiRouter = Router();
      this.app = express();

      v1ApiRouter.use(express.json());

      const sessionOptions = {
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
      this.app.use('/rpc/v1', v1RpcRouter);
      this.app.use('/api/v1', v1ApiRouter);

      v1RpcRouter.post('/', this.rcpServer.request);

      v1ApiRouter.get('/userDetails', (req, res) => {
        res.json({
          id: req.session.playerId ?? null,
          isAuthed: req.session.isAuthed ?? false,
        });
      });
      v1ApiRouter.post('/login', (req, res) => {
        Logger.info('/login', req.body);
        const { login = '', password = '' } = req.body;

        if (login === 'jay' && password === 'two') {
          req.session.isAuthed = true;
          res.json({ isAuthed: true, id: req.session.playerId ?? null });
          return;
        }

        // res.json({ id: session.playerId ?? null });
        res.status(401).send('<p>unknown</p>');
      });

      this.app.listen(port, () => {
        Logger.log(`express on port ${port}`);
        resolve(null);
      });
    });

    this.isInitialized = true;

    return retVal;
  }
  async destroy() {
    return null;
  }
}
