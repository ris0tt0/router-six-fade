import { Initable } from '@jsix/be-db/model';
import Axios from 'axios';
import Logger from 'js-logger';

export type UserDetails = {
  id: string | null;
  isAuthed: boolean;
};
export type LoginDetails = {
  login: string;
  password: string;
};
export interface ClientApi extends Initable {
  getUserDetails(): Promise<UserDetails>;
  postLogin({ login, password }: LoginDetails): Promise<boolean>;
}

export class ClientApiImpl implements ClientApi {
  public isInitialized: boolean = true;
  protected static instance: ClientApi | null = null;

  static getInstance(): ClientApi {
    if (ClientApiImpl.instance == null) {
      ClientApiImpl.instance = new ClientApiImpl();
    }

    return ClientApiImpl.instance;
  }

  private axios = Axios.create({
    baseURL: '/api/v1',
  });

  constructor() {
    Logger.info('ClientDataImpl::ctor');
  }

  async init() {
    Logger.info('ClientApiImpl::init');
    return null;
  }
  async destroy() {
    return null;
  }
  async getUserDetails() {
    const result = await this.axios.get<UserDetails>('/userDetails');
    return result.data;
  }
  async postLogin(login: LoginDetails) {
    const result = await this.axios.post('/login', login);

    Logger.info('postLogin', result);
    if (result.status === 200) {
      return true;
    }
    return false;
  }
}
