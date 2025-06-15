import { Initable } from '@jsix/be-db';
import Axios from 'axios';
import Logger from 'js-logger';

export interface ClientApi extends Initable {
  getPlayerId(): Promise<{ id: string | null }>;
  postLogin({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<boolean>;
}

export class ClientApiImpl implements ClientApi {
  protected static instance: ClientApi | null = null;

  static getInstance(): ClientApi {
    if (ClientApiImpl.instance == null) {
      ClientApiImpl.instance = new ClientApiImpl();
    }

    return ClientApiImpl.instance;
  }

  constructor() {
    Logger.info('ClientApiImpl::ctor');
  }

  private axios = Axios.create({
    baseURL: '/api/v1',
  });

  async init() {
    return null;
  }
  async getPlayerId() {
    const result = await this.axios.get<{ id: string | null }>('/playerId');
    return result.data;
  }
  async postLogin(login: { login: string; password: string }) {
    const result = await this.axios.post('/login', login);

    return true;
  }
}
