import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { IApi } from '../common';

export interface APIContext {
  lang: string;
}

export const api: RPCFunctions<IApi, APIContext> = {
  loadPlayers: () => (context: APIContext) => {
    Logger.info('RPCFunctions::loadPlaeyrs', context.lang);
    return [];
  },
};

export const RpcServer = createServer({
  api,
  deserializer: jsonDeserializer,
});

export const RCPRequest = async (req: Request, res: Response) => {
  try {
    // get the accepted language, use "en" as fallback
    const lang = req.headers['accept-language']?.split(',')?.[0] || 'en';

    // call the rpc function and pass the additional context
    const result = await RpcServer.handleAPIRequest(req, { lang });

    // send the result back to the client
    await res.send(result);
    return;
  } catch (e) {
    await res.send(res);
    return;
  }
};
