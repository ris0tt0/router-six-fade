import Logger from 'js-logger';
import { ClientCommands } from '.';
import { ClientRPC } from '../rpc/client';
import { Dispatch } from '@reduxjs/toolkit';
import { addPlayers } from '../store/slice/appSlice';

export type CommandsParams = {
  rpc: ClientRPC;
  dispatch: Dispatch;
};
export class SpaCommands implements ClientCommands {
  private readonly rpc: ClientRPC;
  private readonly dispatch: Dispatch;

  constructor({ dispatch, rpc }: CommandsParams) {
    this.rpc = rpc;
    this.dispatch = dispatch;
  }
  async init() {
    return null;
  }
  async loadPlayers() {
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
