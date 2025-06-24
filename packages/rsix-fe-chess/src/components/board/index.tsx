import { ChessGameData } from '@jsix/be-db/interface/data/apps';
import { UUID } from '@jsix/be-db/interface/data';
import { useCurrentPlayer } from '@jsix/fe-redux/hooks/useCurrentPlayer';
import { useData } from '@jsix/fe-redux/hooks/useData';
import { usePlayer } from '@jsix/fe-redux/hooks/usePlayer';
import { addDatas } from '@jsix/fe-redux/store/slice/dataSlice';
import { Paper, styled } from '@mui/material';
import { Chess, Square } from 'chess.js';
import Logger from 'js-logger';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useDispatch } from 'react-redux';

const BoardContainer = styled('div')`
  margin: 20px;
`;

const ChessBoardContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const PlayerNameContainer = styled(Paper)`
  display: flex;
  justify-content: center;
`;

export const Board: FC<{
  dataId: UUID;
  onGameUpdate: (data: ChessGameData) => void;
}> = ({ dataId, onGameUpdate }) => {
  const dispatch = useDispatch();
  const data = useData(dataId) as ChessGameData;

  const game = useMemo(() => {
    const game = new Chess();
    return game;
  }, []);

  const fen = data?.moves[data?.moves.length - 1];
  game.load(fen);
  const player = useCurrentPlayer();
  const lightPlayer = usePlayer(data?.lightPlayerId);
  const darkPlayer = usePlayer(data?.darkPlayerId);

  const isActive = player?.id === data?.activePlayerId;
  const boardOrientation = player?.id === lightPlayer?.id ? 'white' : 'black';
  const topName =
    boardOrientation === 'white' ? darkPlayer?.name : lightPlayer?.name;
  const bottomName =
    boardOrientation === 'white' ? lightPlayer?.name : darkPlayer?.name;

  function makeAMove(move: { from: string; to: string; promotion: string }) {
    try {
      if (darkPlayer?.id && lightPlayer?.id) {
        const result = game.move(move);
        const moves = [...data.moves, game.fen()];
        const act = game.turn();
        Logger.info('Commands:makeAmove', act === 'b');
        const activePlayerId = act === 'b' ? darkPlayer.id : lightPlayer.id;

        const resultGameData = { ...data, activePlayerId, moves };

        onGameUpdate(resultGameData);
        dispatch(addDatas([resultGameData]));

        return result;
      }
      throw Error('no active players');
    } catch (e) {
      Logger.warn(e);
    }
    return null;
  }

  const handleOnDrop = (source: Square, target: Square) => {
    if (!isActive) return false;

    const move = makeAMove({ from: source, to: target, promotion: 'q' });
    if (move === null) return false;

    return true;
  };

  return (
    <BoardContainer>
      <PlayerNameContainer>{topName}</PlayerNameContainer>
      <ChessBoardContainer>
        <Chessboard
          id="JayChessBoard"
          position={fen}
          onPieceDrop={handleOnDrop}
          boardOrientation={boardOrientation}
        />
      </ChessBoardContainer>
      <PlayerNameContainer>{bottomName}</PlayerNameContainer>
    </BoardContainer>
  );
};
