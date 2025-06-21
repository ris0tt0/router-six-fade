import { UUID } from 'crypto';

/**
 * THe RSix chess type.
 */
export const RSixChessType = 'rsix-chess-type';

export interface RSixChessGameData {
  lightPlayerId: UUID;
  darkPlayerId: UUID;

  moves: string[];
}
