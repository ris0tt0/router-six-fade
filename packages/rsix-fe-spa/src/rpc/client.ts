import { ApiRPC, RPC_V1 } from '@jsix/be-api';
import { Initable, Player } from '@jsix/be-db';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';

export interface ClientRPC extends Initable {
  loadPlayers(): Promise<Player[]>;
  choosePlayer(playerId: string): Promise<Player>;
  setWsId(wsid: string): Promise<null>;
}

export class ClientRPCImpl implements ClientRPC {
  public isInitialized: boolean = false;

  protected static instance: ClientRPCImpl | null = null;

  private api: Callables<ApiRPC> = createClient<ApiRPC>({
    endpoint: RPC_V1,
    serializer: jsonSerializer,
    xhr: axiosXHR,
  });

  static getInstace(): ClientRPC {
    if (ClientRPCImpl.instance === null) {
      ClientRPCImpl.instance = new ClientRPCImpl();
    }

    return ClientRPCImpl.instance;
  }

  async init() {
    this.isInitialized = true;
    return null;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }

  async loadPlayers() {
    if (this.api) {
      const response = await this.api.loadPlayers().call();
      switch (response.type) {
        case 'fail': {
          Logger.warn('error', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.warn('no response');
          throw new Error('no response');
        }
        case 'success': {
          return response.data;
        }
      }
    }
    {
      throw new Error('no ApiRPC  yo');
    }
  }
  async choosePlayer(playerId: string) {
    if (this.api) {
      const response = await this.api.selectPlayer(playerId).call();

      switch (response.type) {
        case 'fail': {
          Logger.warn('error', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.warn('no response');
          throw new Error('no response');
        }
        case 'success': {
          return response.data;
        }
      }
    }
    {
      throw new Error('no ApiRPC  yo');
    }
  }
  async setWsId(wsid: string) {
    if (this.api) {
      const response = await this.api.setWsId(wsid).call();

      switch (response.type) {
        case 'fail': {
          Logger.warn('error', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.warn('no response');
          throw new Error('no response');
        }
        case 'success': {
          return response.data;
        }
      }
    }
    {
      throw new Error('no ApiRPC  yo');
    }
  }
}
