// import { UUID } from './constants';
// import type { OnlineStatus } from './online';
import type { UUID, OnlineStatus } from './';

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
