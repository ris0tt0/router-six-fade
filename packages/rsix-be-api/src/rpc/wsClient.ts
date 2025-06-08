import { Initable, Player } from '@jsix/be-db';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';
import { WsRPC } from '@jsix/be-ws';

const Endpoint = 'http://localhost:5005/api/v1';

export interface ClientWsRpc extends Initable {
  // loadPlayers(): Promise<Player[]>;
  // getPlayer(id: string): Promise<Player>;
  sendMessage(message: string): Promise<void>;
}

export class ClientWsRpcImpl implements ClientWsRpc {
  private api: Callables<WsRPC> | null = null;

  async init() {
    Logger.info('ClientRPC::init');
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
