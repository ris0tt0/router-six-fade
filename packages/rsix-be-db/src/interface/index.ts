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

export interface Game {
  id: string;
  owners: Player[];
  players: Player[];
}



/**
 * initialization interface.
 */
export interface Initable {
  /**
   * determines if this class is initialized.
   */
  isInitialized: boolean;
  /**
   * Initializes the class
   */
  init(): Promise<null>;
  /**
   * Used to clean up the class, remove event listeners.
   */
  destroy(): Promise<null>;
}

/**
 * Database RPC
 */
export interface DbRPC {
  getAllPlayers: () => Player[];
  selectPlayer: (id: string) => Player;
  updatePlayers: (players: Player[]) => null;
}

export interface ClientDbRpc extends Initable {
  loadPlayers(): Promise<Player[]>;
  getPlayer(id: string): Promise<Player>;
  setPlayer(player: Player): Promise<Player>;
}
