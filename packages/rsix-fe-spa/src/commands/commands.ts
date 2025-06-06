import { ClientCommands } from '.';
import { ClientRPC } from '../server/rpc';

export type CommandsParams = {
  rpc: ClientRPC;
};
export class Commands implements ClientCommands {
  private readonly rpc: ClientRPC;

  constructor({ rpc }: CommandsParams) {
    this.rpc = rpc;
  }
  async init() {
    return null;
  }
  async loadPlayers() {
    const result = await this.rpc.loadPlayers();

    return result;
  }
  async setPlayer() {
    return null;
  }
}
