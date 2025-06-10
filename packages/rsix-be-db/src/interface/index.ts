/**
 * Player online status.
 */
export type OnlineStatus = 'online' | 'offline' | 'busy';

/**
 * Player interface.
 */
export interface Player {
  id: string;
  name: string;
  description?: string;
  status: OnlineStatus;
}

/**
 * initialization interface.
 */
export interface Initable {
  init(): Promise<null>;
}

/**
 * Database RPC
 */
export interface DbRPC {
  getAllPlayers: () => Player[];
  selectPlayer: (id: string) => Player;
  updatePlayers: (players: Player[]) => null;
}
