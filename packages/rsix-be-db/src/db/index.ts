import { Initable, Player } from '../interface';

/**
 * Interface for this database
 */
export interface DataBaseSix extends Initable {
  /**
   * Gets Players for provided ids.
   * @param ids list of player ids
   */
  getPlayers(ids: string[]): Promise<Player[]>;
  /**
   * Get all players for testing
   */
  getAllPlayers(): Promise<Player[]>;
  /**
   * Adds the player to the database
   * @param players Player object
   */
  addPlayers(players: Player[]): Promise<null>;
  /**
   * Removes the players from the database
   * @param players player ids to remove
   */
  removePlayers(players: Player[]): Promise<null>;
}
