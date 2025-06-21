import { UUID } from 'crypto';

/**
 * THe RSix checkers type.
 */
export const RSixCheckersType = 'rsix-checkers-type';

export interface RSixCheckersGameData {
  lightPlayerId: UUID;
  darkPlayerId: UUID;

  moves: string[];
}
