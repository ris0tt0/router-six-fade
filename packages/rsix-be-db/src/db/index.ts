import { UUID } from 'crypto';
import { Game, Initable, Player } from '../interface';
export interface DataGames extends Initable {
  /**
   * Gets Games for provided ids.
   * @param ids list of game ids
   */
  getGames(ids: UUID[]): Promise<Game[]>;
  /**
   * Get all games for testing
   */
  getAllGamesForPlayer(id: UUID): Promise<Game[]>;
  /**
   * Adds the game to the database
   * @param games Game object
   */
  addGames(games: Game[]): Promise<null>;
  /**
   * Removes the games from the database
   * @param games game ids to remove
   */
  removeGames(games: Game[]): Promise<null>;
}

export interface DataPlayers extends Initable {
  /**
   * Gets Players for provided ids.
   * @param ids list of player ids
   */
  getPlayers(ids: UUID[]): Promise<Player[]>;
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
/**
 * Interface for this database
 */
export interface DataBaseSix extends DataPlayers, DataGames {}
