import { Initable, Player } from '@jsix/be-db';
import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { ApiCommands } from '../commands';
import { ApiRPC } from '../interface';

export interface APIContext {
  commands: ApiCommands;
  request: Request;
}

const api: RPCFunctions<ApiRPC, APIContext> = {
  loadPlayers: () => (context: APIContext) => {
    const retVal = new Promise<Player[]>((resolve, reject) => {
      Logger.info(
        'loadPlayers session.id:',
        context.request.session.id,
        'playerID',
        context.request.session.playerId
      );
      context.commands
        .loadPlayers()
        .then((items) => resolve(items))
        .catch((e) => reject(e));
    });

    return retVal;
  },
  selectPlayer: (id) => (context: APIContext) => {
    const retVal = new Promise<Player>((resolve, reject) => {
      Logger.info(
        'selectPlayer called with id:',
        id,
        'request:',
        context.request.session.id
      );
      context.commands
        .selectPlayer(id)
        .then((player) => {
          if (!context.request.session.playerId) {
            context.request.session.playerId = player.id;
          }
          resolve(player);
        })
        .catch((e) => reject(e));
    });
    return retVal;
  },
  setWsId: (id) => (context: APIContext) => {
    const retVal = new Promise<null>((resolve, reject) => {
      Logger.info('RCO id', id, context.request.session.playerId);
      context.commands.setWsId(id, context.request.session.id);
      resolve(null);
    });
    return retVal;
  },
};

export class ServerRPC implements Initable {
  public isInitialized: boolean = false;
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
    this.isInitialized = true;
    return null;
  }
  async destroy() {
    return null;
  }

  request = async (req: Request, res: Response) => {
    try {
      const result = await this.rpc.handleAPIRequest(req, {
        request: req,
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
