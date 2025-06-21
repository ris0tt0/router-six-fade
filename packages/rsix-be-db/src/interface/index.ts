import { RSixChatGameData, RSixChatType } from '@jsix/fe-chat';
import { RSixCheckersGameData, RSixCheckersType } from '@jsix/fe-checkers';
import { RSixChessGameData, RSixChessType } from '@jsix/fe-chess';
import { UUID } from 'crypto';

export const StatusOnline = 'status-online';
export const StatusOffline = 'status-offline';
export const StatusBusy = 'status-busy';

/**
 * Player online status.
 */
export type OnlineStatus =
  | typeof StatusOnline
  | typeof StatusOffline
  | typeof StatusBusy;

/**
 * the currently supported game types.
 */
export type GameTypes =
  | typeof RSixChatType
  | typeof RSixCheckersType
  | typeof RSixChessType;

/**
 * Player interface.
 */
export interface Player {
  id: UUID;
  name: string;
  description?: string;
  status: OnlineStatus;
  gameIds: UUID[];
}

export interface Game {
  id: UUID;
  ownerIds: UUID[];
  playerIds: UUID[];
  data: RSixChatGameData | RSixCheckersGameData | RSixChessGameData;
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
  selectPlayer: (id: UUID) => Player;
  updatePlayers: (players: Player[]) => null;
}

export interface ClientDbRpc extends Initable {
  loadPlayers(): Promise<Player[]>;
  getPlayer(id: UUID): Promise<Player>;
  setPlayer(player: Player): Promise<Player>;
}
