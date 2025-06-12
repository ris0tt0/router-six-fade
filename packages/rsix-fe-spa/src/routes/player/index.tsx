import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/redux';
import { Player } from '@jsix/be-db';

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
  const player = useCurrentPlayer();

  if (player)
    return (
      <div>
        <div>{player.name}</div>
        <div>{player.description}</div>
        <div>player id:{player.id}</div>
      </div>
    );

  return null;
};
