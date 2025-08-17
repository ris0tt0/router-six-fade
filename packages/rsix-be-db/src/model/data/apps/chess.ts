import { UUID } from '../constants';

/**
 * Chess game type
 */
export const ChessType = 'rsix-chess-type';

/**
 * Data for the Chess Game.
 */
export interface ChessGameData {
  id: UUID;
  lightPlayerId: UUID;
  darkPlayerId: UUID;
  activePlayerId: UUID;
  type: typeof ChessType;
  moves: string[];
}
