import { Initable, Player } from '@jsix/be-db';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';
import { DbRPC } from '@jsix/be-db';
import { ClientWsRpc } from './wsClient';

const Endpoint = 'http://localhost:5005/api/v1';

export interface ClientDbRpc extends Initable {
  loadPlayers(): Promise<Player[]>;
  getPlayer(id: string): Promise<Player>;
}

export class ClientDbRpcImpl implements ClientDbRpc {
  private api: Callables<DbRPC> | null = null;

  async init() {
    Logger.info('ClientRPC::init');
    this.api = createClient<DbRPC>({
      endpoint: Endpoint,
      serializer: jsonSerializer,
      xhr: axiosXHR,
    });
    return null;
  }

  async loadPlayers() {
    if (this.api) {
      const response = await this.api.getAllPlayers().call();

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
  async getPlayer(id: string) {
    if (this.api) {
      const response = await this.api.selectPlayer(id).call();

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
}
