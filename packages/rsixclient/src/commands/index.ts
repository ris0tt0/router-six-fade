import { Initable } from '@jsix/db';

export interface ClientCommands extends Initable {
  loadPlayers(): Promise<string[]>;
}
