import { Initable } from '@jsix/be-db/model';
import { createServer, RPCFunctions } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { Request, Response } from 'express';
import Logger from 'js-logger';
import { WsCommands } from '../commands/indext';
import { WsRPC } from '../model/rpc';

export interface WsContext {
  commands: WsCommands;
}

const api: RPCFunctions<WsRPC, WsContext> = {
  sendMessage: (message: string) => (context: WsContext) => {
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
  selectPlayer: (id: string) => (context: WsContext) => {
    const retVal = new Promise<void>((resolve, reject) => {
      // context.commands
    });

    return retVal;
  },
  sendPlayers(players) {
    return (context: WsContext) => {
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
  setClientPlayerId: (playerId, socketId) => (context: WsContext) => {
    const retVal = new Promise<void>((resolve, reject) => {
      context.commands.setPlayerIdSocketId({
        socketId,
        playerId,
      });

      resolve();
    });

    return retVal;
  },
  setClientSessionId: (sessionId, socketId) => (context: WsContext) => {
    const retVal = new Promise<void>((resolve, reject) => {
      Logger.info(
        'setClientSessionId called with sessionId:',
        sessionId,
        'socketId:',
        socketId
      );

      context.commands.setSessionIdSocketId({
        sessionId,
        socketId,
      });
    });

    return retVal;
  },
  updateGameDatas: (ids, datas) => (context: WsContext) => {
    const retVal = new Promise<void>((resolve, reject) => {
      Logger.info('updateGameDatas::ids', ids, 'datas:', datas);

      context.commands.updateGameDatas(ids, datas).then(() => resolve());
    });

    return retVal;
  },
};

export class ServerRPC implements Initable {
  public isInitialized: boolean = false;
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

    this.isInitialized = true;

    return null;
  }
  async destroy() {
    this.isInitialized = false;
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
