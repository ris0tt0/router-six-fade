import { ClientDbRpc, DbRPC, Player } from '@jsix/be-db';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import { UUID } from 'crypto';
import Logger from 'js-logger';

const Endpoint = 'http://localhost:5005/api/v1';

export class ClientDbRpcImpl implements ClientDbRpc {
  public isInitialized: boolean = false;
  private dbRpc: Callables<DbRPC> | null = null;

  async init() {
    Logger.info('ClientDbRPC::init');
    this.dbRpc = createClient<DbRPC>({
      endpoint: Endpoint,
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
            'ws::dbClient:::loadPlayers',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('ws::dbClient:::loadPlayers no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log(
            'ws::dbClient:::loadPlayers',
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
          Logger.log('ws::dbClient::getPlayer', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('ws::dbClient::getPlayer no response');
          throw new Error('ws::dbClient no response');
        }
        case 'success': {
          Logger.log('ws::dbClient::getPlayer', response.code, response.data);
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
                'ws::dbClient:::setPlayer',
                response.code,
                response.error
              );
              throw new Error(response.error);
            }
            case 'noResponse': {
              Logger.log('ws::dbClient:::setPlayer no response');
              throw new Error('no response');
            }
            case 'success': {
              Logger.log(
                'sws::dbClient:::setPlayer',
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
}
