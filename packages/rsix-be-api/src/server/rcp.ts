import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { IApi } from '../common';
import Logger from 'js-logger';

export interface IContext {
  lang: string;
}

export const api: RPCFunctions<IApi, IContext> = {
  loadPlayers: () => (context: IContext) => {
    Logger.info('RPCFunctions::loadPlaeyrs');
    return [];
  },
};

const RpcServer = createServer({
  api,
  deserializer: jsonDeserializer,
});

export { RpcServer };
