import { Initable, Player } from '@jsix/be-db';
import { WsRPC } from '@jsix/be-ws';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';

const Endpoint = 'http://localhost:5009/api/v1';
export interface ClientWsRpc extends Initable {
  sendMessage(message: string): Promise<void>;
  sendPlayers(players: Player[]): Promise<void>;
  setWsId(id: string, sessionId: string): Promise<void>;
}

export class ClientWsRpcImpl implements ClientWsRpc {
  private api: Callables<WsRPC> | null = null;

  async init() {
    Logger.info('ClientWsRPC::init');
    this.api = createClient<WsRPC>({
      endpoint: Endpoint,
      serializer: jsonSerializer,
      xhr: axiosXHR,
    });
    return null;
  }

  async sendMessage(message: string) {
    if (this.api) {
      const response = await this.api.sendMessage(message).call();

      switch (response.type) {
        case 'fail': {
          Logger.log('error', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log('success', response.code, response.data);
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
  async sendPlayers(players: Player[]) {
    if (this.api) {
      const response = await this.api.sendPlayers(players).call();

      switch (response.type) {
        case 'fail': {
          Logger.log('error', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log('success', response.code, response.data);
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
  async setWsId(id: string, sessionId: string) {
    if (this.api) {
      const response = await this.api.setClientSessionId(sessionId, id).call();

      switch (response.type) {
        case 'fail': {
          Logger.log('error', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log('success', response.code, response.data);
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }

  // async getPlayer(id: string) {
  //   if (this.api) {
  //     const response = await this.api.selectPlayer(id).call();

  //     switch (response.type) {
  //       case 'fail': {
  //         Logger.log('error', response.code, response.error);
  //         throw new Error(response.error);
  //       }
  //       case 'noResponse': {
  //         Logger.log('no response');
  //         throw new Error('no response');
  //       }
  //       case 'success': {
  //         Logger.log('success', response.code, response.data);
  //         return response.data;
  //       }
  //     }
  //   }
  //   {
  //     throw new Error('no api  yo');
  //   }
  // }
}
