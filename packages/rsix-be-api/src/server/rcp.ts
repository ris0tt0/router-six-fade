import { Initable } from '@jsix/be-db';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';
import { IApi } from '../common';
export interface ClientRPC extends Initable {
  loadPlayers(): Promise<string[]>;
}

export class ClientRPCImpl implements ClientRPC {
  private api: Callables<IApi> | null = null;

  async init() {
    Logger.info('ClientRPC::init');
    this.api = createClient<IApi>({
      endpoint: 'api/v1',
      serializer: jsonSerializer,
      xhr: axiosXHR,
    });
    return null;
  }

  async loadPlayers() {
    if (this.api) {
      const response = await this.api.loadPlayers().call();

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
