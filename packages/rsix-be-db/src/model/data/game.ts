import type { UUID } from './';

/**
 * Game data object interface.
 */
export interface Game {
  id: UUID;
  title: string;
  description: string;
  ownerIds: UUID[];
  playerIds: UUID[];
  dataId: UUID;
}
