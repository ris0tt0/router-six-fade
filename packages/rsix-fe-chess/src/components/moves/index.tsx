import { styled } from '@mui/material';
import { Move } from 'chess.js';
import Logger from 'js-logger';
import React, { FC } from 'react';

const ChessBoardMovesContainer = styled('div')`
  min-width: 300px;
  border: 1px yellow solid;
`;

export const ChessboardMoves: FC<{ moves: Move[] }> = ({ moves }) => {
  Logger.info('ChessboardMoves', moves);
  return <ChessBoardMovesContainer>one two</ChessBoardMovesContainer>;
};
