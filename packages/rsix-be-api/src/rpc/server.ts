import { Initable, Player } from '@jsix/be-db';
import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { ApiRPC } from '../interface';
import { ClientDbRpc } from './client';

export interface APIContext {
  client: ClientDbRpc;
}

const api: RPCFunctions<ApiRPC, APIContext> = {
  loadPlayers: () => (context: APIContext) => {
    const retVal = new Promise<Player[]>((resolve, reject) => {
      context.client
        .loadPlayers()
        .then((items) => resolve(items))
        .catch((e) => reject(e));
    });

    return retVal;
  },
  choosePlayer: (id) => (context: APIContext) => {
    const retVal = new Promise<Player>((resolve, reject) => {
      // context.client.?
      resolve({} as Player);
    });
    return retVal;
  },
};

export class ServerRPC implements Initable {
  private rpc: any | null = null;
  private client: ClientDbRpc;

  constructor(rpcClient: ClientDbRpc) {
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
      const result = await this.rpc.handleAPIRequest(req, {
        client: this.client,
      });

      await res.send(result);
      return;
    } catch (e) {
      await res.send(res);
      return;
    }
  };
}
