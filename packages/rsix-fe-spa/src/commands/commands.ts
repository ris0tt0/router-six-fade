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
    return null;
  }
  async loadPlayers() {
    if (this.socketClient.wsid === null) {
      const id = await this.socketClient.connect();
      await this.rpc.setWsId(id);
    }

    const result = await this.rpc.loadPlayers();

    return result;
  }
  async choosePlayer(playerId: string) {
    const result = await this.rpc.choosePlayer(playerId);

    Logger.info(`commands::choosePlayer ${playerId} chosen`, result);

    this.dispatch(addPlayers([result]));
    this.dispatch(setPlayerId(result.id));

    return result;
  }
  async setPlayerWsId(id: string) {
    const result = await this.rpc.setWsId(id);
    return null;
  }
}
