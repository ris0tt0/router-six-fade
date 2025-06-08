import { Player } from '@jsix/be-db';
import { Button, Paper, styled } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/redux';
import Logger from 'js-logger';

const ChoosePlayersContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px red solid;
`;

const PlayerItem = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  min-width: 100px;
  height: 150px;
  min-height: 100px;
  padding: 10px;
  margin: 10px;
`;
const PlayerItemContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  border: 1px purple solid;
`;

const OnlineStatusContainer = styled('div')`
  display: flex;
  border: 1px red solid;
  margin: 10px 0;
`;

const OnlineStatus: FC<{ player: Player }> = ({ player }) => {
  return <OnlineStatusContainer>status: {player.status}</OnlineStatusContainer>;
};

const ChoosePlayerItem: FC<{ player: Player }> = ({ player }) => {
  const handleSelect = () => {
    Logger.info('handle-click', player.id);
  };

  return (
    <PlayerItem>
      <h3>{player.name}</h3>
      <OnlineStatus player={player} />
      <div>
        <Button variant="outlined" onClick={handleSelect}>
          select
        </Button>
      </div>
    </PlayerItem>
  );
};

export const ChoosePlayerRoute: FC = () => {
  const playerData = useSelector<RootState>((state) => state.app.players);
  const [players, setPlayers] = useState<Player[] | null>(null);

  useEffect(() => {
    if (playerData) {
      const result = Object.values(playerData) ?? null;
      setPlayers(result);
    }
  }, [playerData]);

  const items = useMemo(() => {
    const result = players?.map((player) => (
      <ChoosePlayerItem key={player.id} player={player} />
    ));
    return result;
  }, [players]);

  return (
    <ChoosePlayersContainer>
      <h2>Select a Player</h2>
      <PlayerItemContainer>{items}</PlayerItemContainer>
    </ChoosePlayersContainer>
  );
};
