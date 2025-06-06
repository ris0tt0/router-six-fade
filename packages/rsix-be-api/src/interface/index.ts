import { Player } from '@jsix/be-db';

export interface ApiRPC {
  loadPlayers: () => Player[];
  selectPlayer: (id: string) => Player;
}
