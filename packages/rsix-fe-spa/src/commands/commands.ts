import Logger from 'js-logger';
import { ClientCommands } from '.';
import { ClientRPC } from '../rpc/client';
import { Dispatch } from '@reduxjs/toolkit';
import { addPlayers, setPlayerId } from '../store/slice/appSlice';
import { WebSocketClient } from '../wsclient';
import { ClientApi } from '../api';

export type CommandsParams = {
  api: ClientApi;
  rpc: ClientRPC;
  socket: WebSocketClient;
  dispatch: Dispatch;
};
export class ClientCommandsImpl implements ClientCommands {
  public isInitialized: boolean = false;

  private readonly api: ClientApi;
  private readonly rpc: ClientRPC;
  private readonly dispatch: Dispatch;
  private readonly socketClient: WebSocketClient;

  constructor({ dispatch, api, rpc, socket }: CommandsParams) {
    this.api = api;
    this.rpc = rpc;
    this.socketClient = socket;
    this.dispatch = dispatch;
  }
  async init() {
    await this.rpc.init();
    this.isInitialized = true;
    return null;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }
  async connectSocket() {
    if (this.socketClient.wsid === null) {
      const id = await this.socketClient.connect();
      await this.rpc.setWsId(id);
    }

    return null;
  }
  async choosePlayer(playerId: string) {
    Logger.info('choosePlayer', playerId);
    const player = await this.rpc.choosePlayer(playerId);

    Logger.info('commands::choosePlayer', this.socketClient.wsid);
    Logger.info(`commands::choosePlayer ${playerId} player`, player);

    this.dispatch(addPlayers([player]));
    this.dispatch(setPlayerId(player.id));

    return player;
  }
  async setPlayerWsId(id: string) {
    const result = await this.rpc.setWsId(id);
    return null;
  }
}
