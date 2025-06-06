import { Player } from '@jsix/be-db';

export interface ApiRPC {
  loadPlayers: () => Player[];
  choosePlayer: (id: string) => Player;
}
