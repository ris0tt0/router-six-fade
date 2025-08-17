import { UUID } from './constants';
import { OnlineStatus } from './online';

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
