import { Initable, Player } from '@jsix/be-db';
import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { ApiRPC } from '../interface';
import { ClientDbRpc } from './dbClient';
import { ApiCommands } from '../commands';

export interface APIContext {
  commands: ApiCommands;
}

const api: RPCFunctions<ApiRPC, APIContext> = {
  loadPlayers: () => (context: APIContext) => {
    const retVal = new Promise<Player[]>((resolve, reject) => {
      context.commands
        .loadPlayers()
        .then((items) => resolve(items))
        .catch((e) => reject(e));
    });

    return retVal;
  },
  selectPlayer: (id) => (context: APIContext) => {
    const retVal = new Promise<Player>((resolve, reject) => {
      context.commands
        .selectPlayer(id)
        .then((player) => resolve(player))
        .catch((e) => reject(e));
    });
    return retVal;
  },
};

export class ServerRPC implements Initable {
  private rpc: any | null = null;
  private commands: ApiCommands;

  constructor(commands: ApiCommands) {
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
