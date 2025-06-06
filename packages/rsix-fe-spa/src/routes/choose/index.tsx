import { Player } from '@jsix/be-db';
import { styled } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/redux';

const ChoosePlayersContainerStyled = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px red solid;

  h3 {
    border: 1px yellow solid;
  }
`;

export const ChoosePlayer: FC = () => {
  const playerData = useSelector<RootState>((state) => state.app.players);
  const [players, setPlayers] = useState<Player[] | null>(null);

  useEffect(() => {
    if (playerData) {
      const result = Object.values(playerData) ?? null;
      setPlayers(result);
    }
  }, [playerData]);

  const items = useMemo(() => {
    const result = players?.map((player) => {
      return <div key={player.id}>{player.name}</div>;
    });
    return result;
  }, [players]);

  return (
    <ChoosePlayersContainerStyled>
      <h3>select a player</h3>
      <div>{items}</div>
    </ChoosePlayersContainerStyled>
  );
};
