import { Initable, Player } from '@jsix/be-db';
import { WsRPC } from '@jsix/be-ws';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import { UUID } from 'crypto';
import Logger from 'js-logger';

const Endpoint = 'http://localhost:5009/api/v1';
export interface ClientWsRpc extends Initable {
  sendMessage(message: string): Promise<void>;
  sendPlayers(players: Player[]): Promise<void>;
  setWsId(socketId: UUID, sessionId: string): Promise<void>;
  setPlayerId(socketId: UUID, playerId: string): Promise<void>;
}

export class ClientWsRpcImpl implements ClientWsRpc {
  public isInitialized: boolean = false;
  private wsRpc: Callables<WsRPC> | null = null;

  async init() {
    Logger.info('ClientWsRPC::init');
    this.wsRpc = createClient<WsRPC>({
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
  async sendMessage(message: string) {
    if (this.wsRpc) {
      const response = await this.wsRpc.sendMessage(message).call();

      switch (response.type) {
        case 'fail': {
          Logger.log(
            'api::wsClient::sendMessage',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::wsClient::sendMessage no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log(
            'api::wsClient::sendMessage',
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
  async setPlayerId(socketId: UUID, playerId: string): Promise<void> {
    if (this.wsRpc) {
      const response = await this.wsRpc
        .setClientPlayerId(playerId, socketId)
        .call();

      switch (response.type) {
        case 'fail': {
          Logger.log(
            'api::wsClient::sendPlayerId',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::wsClient::sendPlayerId no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log(
            'api::wsClient::sendPlayerId',
            response.code,
            response.data
          );
          return response.data;
        }
      }
      return;
    }
    {
      throw new Error('no ws rpc');
    }
  }
  async sendPlayers(players: Player[]) {
    if (this.wsRpc) {
      const response = await this.wsRpc.sendPlayers(players).call();

      switch (response.type) {
        case 'fail': {
          Logger.log(
            'api::wsClient::sendPlayers',
            response.code,
            response.error
          );
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::wsClient::sendPlayers no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log(
            'api::wsClient::sendPlayers',
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
  async setWsId(socketId: UUID, sessionId: string) {
    if (this.wsRpc) {
      const response = await this.wsRpc
        .setClientSessionId(sessionId, socketId)
        .call();

      switch (response.type) {
        case 'fail': {
          Logger.log('api::wsClient::setWsId', response.code, response.error);
          throw new Error(response.error);
        }
        case 'noResponse': {
          Logger.log('api::wsClient::setWsId no response');
          throw new Error('no response');
        }
        case 'success': {
          Logger.log('api::wsClient::setWsId', response.code, response.data);
          return response.data;
        }
      }
    }
    {
      throw new Error('no api  yo');
    }
  }
}
