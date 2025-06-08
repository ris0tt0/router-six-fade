import { Initable } from '@jsix/be-db';
import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { WsRPC } from '../interface';

export interface APIContext {
  // web socket.
  client: string;
}

const api: RPCFunctions<WsRPC, APIContext> = {
  sendMessage: (message: string) => (context: APIContext) => {
    const retVal = new Promise<void>((resolve, reject) => {
      Logger.info('sendMessage called with message:', message);
      // Here you would implement the logic to send a message via WebSocket
      // For demonstration, we'll just log the message and resolve the promise
      try {
        Logger.info('Message sent:', message);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
    return retVal;
  },
};

export class ServerRPC implements Initable {
  private rpc: any | null = null;

  private client: string = 'ws-client';

  // constructor(rpcClient: ClientDbRpc) {
  //   this.client = rpcClient;
  // }
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
