import { Initable, Player } from '@jsix/be-db';

/**
 * ClientCommands interface defines the commands available for the client side.
 * It extends the Initable interface, which requires an init method.
 * The ClientCommands interface includes methods for loading players, choosing a player,
 * and setting the WebSocket ID for the player.
 * Each method returns a Promise that resolves to the appropriate type.
 * - loadPlayers: Returns a Promise that resolves to an array of Player objects.
 * - choosePlayer: Takes a playerId as an argument and returns a Promise that resolves to the chosen Player object.
 * - setPlayerWsId: Takes a WebSocket ID as an argument and returns a Promise that resolves to null
 */
export interface ClientCommands extends Initable {
  /* * Initializes the client commands.
   * @returns A Promise that resolves to null.
   */
  loadPlayers(): Promise<Player[]>;
  /* * Chooses a player based on the provided playerId.
   * @param playerId - The ID of the player to choose.
   * @returns A Promise that resolves to the chosen Player object.
   */
  choosePlayer(playerId: string): Promise<Player>;
  /* * Sets the WebSocket ID for the player.
   * @param id - The WebSocket ID to set.
   * @returns A Promise that resolves to null.
   */
  setPlayerWsId(id: string): Promise<null>;
}
