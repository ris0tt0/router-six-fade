/**
 * Player online status.
 */
export type OnlineStatus = 'online' | 'offlilne' | 'busy';

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
