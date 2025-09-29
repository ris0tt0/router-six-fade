import { ChatGameData, ChatType } from './chat';
import { CheckersGameData, CheckersType } from './checkers';
import { ChessGameData, ChessType } from './chess';

/**
 * The game types supported.
 */
type GameTypes = typeof CheckersType | typeof ChessType | typeof ChatType;

type GameDataTypes = CheckersGameData | ChessGameData | ChatGameData;

export type {
  GameTypes,
  GameDataTypes,
  CheckersGameData,
  ChessGameData,
  ChatGameData,
};
export { CheckersType, ChessType, ChatType };
