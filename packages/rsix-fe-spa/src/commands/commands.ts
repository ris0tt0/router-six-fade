import Logger from 'js-logger';
import { ClientCommands } from '.';
import { ClientRPC } from '../rpc/client';
import { Dispatch } from '@reduxjs/toolkit';
import { addPlayers } from '../store/slice/appSlice';
import { WebSocketClient } from '../wsclient';

export type CommandsParams = {
  rpc: ClientRPC;
  socket: WebSocketClient;
  dispatch: Dispatch;
};
export class ClientCommandsImpl implements ClientCommands {
  private readonly rpc: ClientRPC;
  private readonly dispatch: Dispatch;
  private readonly socket: WebSocketClient;

  constructor({ dispatch, rpc, socket }: CommandsParams) {
    this.rpc = rpc;
    this.socket = socket;
    this.dispatch = dispatch;
  }
  async init() {
    await this.rpc.init();
    return null;
  }
  async loadPlayers() {
    const id = await this.socket.connect();
    Logger.info('commands::loadPlayers - connected with id', id);
    await this.rpc.setWsId(id);
    const result = await this.rpc.loadPlayers();

    return result;
  }
  async choosePlayer(playerId: string) {
    const result = await this.rpc.choosePlayer(playerId);

    Logger.info(`commands::choosePlayer ${playerId} chosen`, result);

    this.dispatch(addPlayers([result]));

    return result;
  }
  async setPlayer() {
    return null;
  }
  async setPlayerWsId(id: string) {
    const result = await this.rpc.setWsId(id);
    return null;
  }
}
