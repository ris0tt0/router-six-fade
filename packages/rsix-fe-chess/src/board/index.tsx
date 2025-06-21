import { styled } from '@mui/material';
import { Square } from 'chess.js';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { Chessboard } from 'react-chessboard';

const BoardContainer = styled('div')`
  margin: 20px;
`;

export const Board: FC = () => {
  const handleOnDrop = (source: Square, target: Square) => {
    Logger.info('Chess::Board::handleOnDrop', source, target);

    return true;
  };
  return (
    <BoardContainer>
      <Chessboard id="BasicBoard" onPieceDrop={handleOnDrop} />
    </BoardContainer>
  );
};
