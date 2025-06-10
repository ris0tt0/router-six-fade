import { Initable } from '@jsix/be-db';
import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { WsRPC } from '../interface';
import { WsCommands } from '../commands/indext';

export interface APIContext {
  commands: WsCommands;
}

const api: RPCFunctions<WsRPC, APIContext> = {
  sendMessage: (message: string) => (context: APIContext) => {
    const retVal = new Promise<void>((resolve, reject) => {
      Logger.info('sendMessage called with message:', message);
      context.commands
        .sendMessage(message)
        .then(() => {
          Logger.info('Message sent successfully:', message);
          resolve();
        })
        .catch((e) => {
          Logger.error('Error sending message:', e);
          reject(e);
        });
    });
    return retVal;
  },
  sendPlayers(players) {
    return (context: APIContext) => {
      const retVal = new Promise<void>((resolve, reject) => {
        Logger.info('sendPlayers called with players:', players);
        context.commands
          .sendPlayers(players)
          .then(() => {
            Logger.info('Players sent successfully:', players);
            resolve();
          })
          .catch((e) => {
            Logger.error('Error sending players:', e);
            reject(e);
          });
      });
      return retVal;
    };
  },
};

export class ServerRPC implements Initable {
  private rpc: any | null = null;
  private commands: WsCommands;
  constructor(commands: WsCommands) {
    this.commands = commands;
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
        commands: this.commands,
      });

      await res.send(result);
      return;
    } catch (e) {
      await res.send(res);
      return;
    }
  };
}
