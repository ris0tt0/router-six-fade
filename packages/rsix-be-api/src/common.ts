import { Player } from '@jsix/be-db';
export interface IApi {
  loadPlayers: () => Player[];
}
