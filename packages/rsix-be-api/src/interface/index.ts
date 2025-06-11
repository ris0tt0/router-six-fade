import { Player } from '@jsix/be-db';

export interface ApiRPC {
  loadPlayers: () => Player[];
  selectPlayer: (id: string) => Player;
  /**
   * sets the websocket id for the current session
   * @param wsid  - The WebSocket ID to set for the current session.
   * This method is used to associate a WebSocket connection with the current session.
   * It allows the server to send real-time updates to the client over WebSocket.
   * @returns null
   */
  setWsId: (wsid: string) => null;
}
