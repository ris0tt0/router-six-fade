import { Initable, Player } from '@jsix/be-db';

export interface ClientCommands extends Initable {
  loadPlayers(): Promise<Player[]>;
  setPlayer(): Promise<null>;
}
