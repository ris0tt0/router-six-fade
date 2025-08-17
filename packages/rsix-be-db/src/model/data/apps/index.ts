import { ChatGameData, ChatType } from './chat';
import { CheckersGameData, CheckersType } from './checkers';
import { ChessGameData, ChessType } from './chess';

/**
 * The game types supported.
 */
export type GameTypes =
  | typeof CheckersType
  | typeof ChessType
  | typeof ChatType;

export type GameDataTypes = CheckersGameData | ChessGameData | ChatGameData;

export {
  CheckersGameData,
  CheckersType,
  ChessGameData,
  ChessType,
  ChatGameData,
  ChatType,
};
