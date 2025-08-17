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
  | 'rsix-chat-type'
  | 'rsix-checkers-type'
  | 'rsix-chess-type';
