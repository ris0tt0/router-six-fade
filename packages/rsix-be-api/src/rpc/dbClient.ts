import { Game, Player, UUID } from '@jsix/be-db/interface/data';
import { GameDataTypes } from '@jsix/be-db/interface/data/apps';
import { ClientDbRpc, DbRPC, RPC_V1 } from '@jsix/be-db/interface/rpc';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';

const URL = process.env.RPC_DB_URL ?? 'http://localhost:5005';
export class ClientDbRpcImpl implements ClientDbRpc {
  public isInitialized: boolean = false;
  private dbRpc: Callables<DbRPC> | null = null;

  async init() {
    this.dbRpc = createClient<DbRPC>({
      endpoint: `${URL}/${RPC_V1}`,
      serializer: jsonSerializer,
      xhr: axiosXHR,
    });
    this.isInitialized = true;
    return null;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }

  async loadPlayers() {
    if (this.dbRpc) {
      const response = await this.dbRpc.getAllPlayers().call();

      switch (response.type) {
        case 'fail': {
          Logger.log(
            'api::dbClient::loadPlayers',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::dbClient::loadPlayers no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log(
            'api::dbClient::loadPlayers',
            response.code,
            response.data
          );
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
  async getPlayer(id: UUID) {
    if (this.dbRpc) {
      const response = await this.dbRpc.selectPlayer(id).call();

      switch (response.type) {
        case 'fail': {
          Logger.log('api::dbClient::getPlayer', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::dbClient::getPlayer no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log('api::dbClient::getPlayer', response.code, response.data);
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
  async getPlayers(ids: UUID[]) {
    if (this.dbRpc) {
      const response = await this.dbRpc.getPlayers(ids).call();

      switch (response.type) {
        case 'fail': {
          Logger.log(
            'api::dbClient::getPlayers',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::dbClient::getPlayers no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log('api::dbClient::getPlayers', response.code, response.data);
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
  async getGames(ids: UUID[]) {
    if (this.dbRpc) {
      const response = await this.dbRpc.getGames(ids).call();

      switch (response.type) {
        case 'fail': {
          Logger.log(
            'api::dbClient::getPlayers',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::dbClient::getPlayers no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log('api::dbClient::getPlayers', response.code, response.data);
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
  async updateGames(games: Game[]) {
    if (this.dbRpc) {
      const response = await this.dbRpc.updateGames(games).call();

      switch (response.type) {
        case 'fail': {
          Logger.log(
            'api::dbClient::updateGames',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::dbClient::updateGames no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log(
            'api::dbClient::updateGames',
            response.code,
            response.data
          );
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
  setPlayer(player: Player): Promise<Player> {
    if (this.dbRpc) {
      return this.dbRpc
        .updatePlayers([player])
        .call()
        .then((response) => {
          switch (response.type) {
            case 'fail': {
              Logger.log(
                'api::dbClient::setPlayer',
                response.code,
                response.error
              );
              throw new Error(response.error);
            }
            case 'noResponse': {
              Logger.log('api::dbClient::setPlayer no response');
              throw new Error('no response');
            }
            case 'success': {
              Logger.log(
                'api::dbClient::setPlayer',
                response.code,
                response.data
              );
              return player;
            }
          }
        });
    }
    {
      throw new Error('no api  yo');
    }
  }
  async getDatas(ids: UUID[]) {
    if (this.dbRpc) {
      const response = await this.dbRpc.getDatas(ids).call();

      switch (response.type) {
        case 'fail': {
          Logger.log('api::dbClient::getDatas', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::dbClient::getDatas no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log('api::dbClient::getDatas', response.code, response.data);
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
  async updateDatas(games: GameDataTypes[]) {
    if (this.dbRpc) {
      const response = await this.dbRpc.updateDatas(games).call();

      switch (response.type) {
        case 'fail': {
          Logger.log(
            'api::dbClient::updateDatas',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::dbClient::updateDatas no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log(
            'api::dbClient::updateDatas',
            response.code,
            response.data
          );
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
}
