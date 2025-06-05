import { Initable, Player } from '@jsix/be-db';
import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { IApi } from '../common';
import { ClientRPC } from './client';

export interface APIContext {
  lang: string;
  client: ClientRPC;
}

const api: RPCFunctions<IApi, APIContext> = {
  loadPlayers: () => (context: APIContext) => {
    const retVal = new Promise<Player[]>((resolve, reject) => {
      Logger.info('RPCFunctions::loadPlaeyrs', context.lang);
      context.client.loadPlayers().then((items) => resolve(items));
    });

    return retVal;
  },
};

export class ServerRPC implements Initable {
  private rpc: any | null = null;
  private client: ClientRPC;

  constructor(rpcClient: ClientRPC) {
    this.client = rpcClient;
  }
  async init() {
    Logger.info('ServerRPC::init');
    this.rpc = createServer({
      api,
      deserializer: jsonDeserializer,
    });

    return null;
  }

  request = async (req: Request, res: Response) => {
    try {
      // get the accepted language, use "en" as fallback
      const lang = req.headers['accept-language']?.split(',')?.[0] || 'en';

      // call the rpc function and pass the additional context
      const result = await this.rpc.handleAPIRequest(req, {
        lang,
        client: this.client,
      });

      // send the result back to the client
      await res.send(result);
      return;
    } catch (e) {
      await res.send(res);
      return;
    }
  };
}
