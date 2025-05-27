import express, { Router } from 'express';
import Logger from 'js-logger';
import { RCPRequest } from '../request';

const port = process.env.PORT || 5004;

export const app: express.Application = express();
const v1Router = Router();

app.use('/api/v1', v1Router);

v1Router.post('/', RCPRequest);

app.listen(port, () => {
  Logger.log(`listening on port ${port}`);
});
