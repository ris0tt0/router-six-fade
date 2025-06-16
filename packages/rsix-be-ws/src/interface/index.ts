import { Player } from '@jsix/be-db';
import { UUID } from 'crypto';

/**
 * WebSocket RPC interface for sending messages and player data.
 * This interface defines the methods that can be called over WebSocket RPC.
 * It is used to communicate between the client and server for real-time updates.
 * The methods are designed to be called from the client side, and they return promises
 * that resolve when the server has processed the request.
 */
export interface WsRPC {
  /**
  `* This method is used to send a message to the server.
   * It can be used for logging, notifications, or any other text-based communication.
   * The server will handle the message and may respond with an acknowledgment or further actions. 
   * 
   * @param message The message to send to the server.
   * @returns A promise that resolves when the message has been sent.
   */
  sendMessage(message: string): Promise<void>;
  /**
   * This method is used to send player data to the server.
   * The server will process the player data and may respond with an acknowledgment or further actions.
   *
   * @param players An array of Player objects to send to the server.
   */
  sendPlayers(players: Player[]): Promise<void>;
  /**
   * This method is used to select a player on the server.
   * @param id The ID of the player to select.
   */
  selectPlayer(id: string): Promise<void>;
  /**
   * This method is used to set the WebSocket ID for the client session.
   * It associates the WebSocket connection with a specific session ID and socket ID.
   *
   * @param sessionId The session ID to associate with the WebSocket connection.
   * @param socketId The socket ID of the WebSocket connection.
   */
  setClientSessionId(sessionId: string, socketId: UUID): Promise<void>;
  setClientPlayerId(playerId: string, socketId: UUID): Promise<void>;
}
