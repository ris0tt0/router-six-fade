import { ApiRPC, RPC_V1 } from '@jsix/be-api/model/rpc';
import { Initable } from '@jsix/be-db/model';
import { Game, Player, UUID } from '@jsix/be-db/model/data';
import { GameDataTypes } from '@jsix/be-db/model/data/apps';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';

export interface ClientRPC extends Initable {
  loadPlayers(): Promise<Player[]>;
  choosePlayer(playerId: string): Promise<Player>;
  setWsId(wsid: string): Promise<null>;
  //
  getPlayers(ids: UUID[]): Promise<Player[]>;
  getGames(ids: UUID[]): Promise<Game[]>;
  updateGames(games: Game[]): Promise<Game[]>;
  getDatas(ids: UUID[]): Promise<GameDataTypes[]>;
  updateDatas(datas: GameDataTypes[]): Promise<GameDataTypes[]>;
}

export class ClientRPCImpl implements ClientRPC {
  public isInitialized: boolean = false;

  protected static instance: ClientRPCImpl | null = null;

  private apiRpc: Callables<ApiRPC> = createClient<ApiRPC>({
    // TODO add client endpoint
    endpoint: `/${RPC_V1}`,
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
    if (this.apiRpc) {
      const response = await this.apiRpc.loadPlayers().call();
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
  async choosePlayer(playerId: UUID) {
    if (this.apiRpc) {
      Logger.info('rpc,client::chooseplayer', playerId);
      const response = await this.apiRpc.selectPlayer(playerId).call();

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
    if (this.apiRpc) {
      const response = await this.apiRpc.setWsId(wsid as UUID).call();

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
  async getPlayers(ids: UUID[]) {
    if (this.apiRpc) {
      Logger.info('rpc,client::chooseplayer', ids);
      const response = await this.apiRpc.getPlayers(ids).call();

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
  async getGames(ids: UUID[]) {
    if (this.apiRpc) {
      Logger.info('rpc,client::chooseplayer', ids);
      const response = await this.apiRpc.getGames(ids).call();

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
  async updateGames(games: Game[]) {
    if (this.apiRpc) {
      Logger.info('rpc,client::updateGames', games);
      const response = await this.apiRpc.updateGames(games).call();

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
  async getDatas(ids: UUID[]) {
    if (this.apiRpc) {
      Logger.info('rpc,client::getDatas', ids);
      const response = await this.apiRpc.getGameDatas(ids).call();

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
  async updateDatas(datas: GameDataTypes[]) {
    if (this.apiRpc) {
      Logger.info('rpc,client::updateDatas', datas);
      const response = await this.apiRpc.updateGameDatas(datas).call();

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
