import { Player } from '@jsix/be-db';
import Logger from 'js-logger';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteLoaderData } from 'react-router-dom';
import { RootState } from '../../store/redux';
import { UserDetails } from '../../api';
import { useCommands } from '../../hooks/useCommands';

const useCurrentPlayer = () => {
  const playerData = useSelector<RootState, Record<string, Player>>(
    (state) => state.app.players
  );
  const playerId = useSelector<RootState, string | null>(
    (state) => state.app.playerId
  );

  if (playerId) {
    return playerData ? playerData[playerId] : null;
  }
  return null;
};

export const PlayerRoute: FC = () => {
  const commands = useCommands();
  const data = useRouteLoaderData<UserDetails>('app');
  const player = useCurrentPlayer();

  useEffect(() => {
    if (player === null) {
      if (data && data.id !== null) {
        commands.choosePlayer(data.id);
        commands.connectSocket();
      }
    }
  }, [player]);

  if (player)
    return (
      <div>
        <div>{player.name}</div>
        <div>{player.description}</div>
        <div>player id:{player.id}</div>
      </div>
    );

  return <div>no player!</div>;
};
