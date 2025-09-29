import type { UUID } from '../';

/**
 * Checkers game type
 */
export const CheckersType = 'rsix-checkers-type';
/**
 * Data for the Checkers
 */
export interface CheckersGameData {
  id: UUID;
  lightPlayerId: UUID;
  darkPlayerId: UUID;
  type: typeof CheckersType;
  moves: string[];
}
