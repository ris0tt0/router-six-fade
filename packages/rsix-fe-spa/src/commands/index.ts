import { Initable } from '@jsix/be-db';

export interface ClientCommands extends Initable {
  loadPlayers(): Promise<string[]>;
}
