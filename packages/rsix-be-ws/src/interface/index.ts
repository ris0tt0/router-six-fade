import { Player } from '@jsix/be-db';

export interface WsRPC {
  sendMessage(message: string): Promise<void>;
  sendPlayers(players: Player[]): Promise<void>;
  selectPlayer(id: string): Promise<void>;
}
