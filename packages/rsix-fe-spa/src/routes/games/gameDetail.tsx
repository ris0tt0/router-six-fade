import { UUID } from '@jsix/be-db/model/data';
import { ChessGameData } from '@jsix/be-db/model/data/apps';
import { Board } from '@jsix/fe-chess/components/board/index';
import { useGame } from '@jsix/fe-redux/hooks/useGame';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useCommands } from '../../hooks/useCommands';

export const GamesRouteDetail: FC = () => {
  const commands = useCommands();
  const params = useParams();
  const game = useGame(params.gameId as UUID);

  const handleOnChessData = (data: ChessGameData) => {
    Logger.info('GameRouteDetail::handleOnChessData', data);
    commands.updateGameData([data]);
  };

  if (game) {
    return (
      <div>
        <div>{game.title}</div>
        <div>{game.description}</div>
        <Board dataId={game.dataId} onGameUpdate={handleOnChessData} />
      </div>
    );
  }

  return null;
};
