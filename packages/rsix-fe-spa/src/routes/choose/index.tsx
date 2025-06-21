import { Player, StatusOnline } from '@jsix/be-db';
import { Button, Paper, styled } from '@mui/material';
import Logger from 'js-logger';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useCommands } from '../../hooks/useCommands';
import { RootState } from '../../store/redux';
import { addPlayers } from '../../store/slice/appSlice';

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
  return <OnlineStatusContainer>{player.status}</OnlineStatusContainer>;
};

const ChoosePlayerItem: FC<{ player: Player }> = ({ player }) => {
  const commands = useCommands();
  const navigate = useNavigate();

  const handleSelect = () => {
    commands
      .choosePlayer(player.id)
      .then((player) => {
        Logger.info('player selected', player);
        navigate('/player');
      })
      .catch((error) => {
        Logger.warn(error);
      });
  };

  return (
    <PlayerItem>
      <div>{player.name}</div>
      <OnlineStatus player={player} />
      <div>
        <Button
          disabled={player.status === StatusOnline}
          variant="outlined"
          onClick={handleSelect}
        >
          select
        </Button>
      </div>
    </PlayerItem>
  );
};

export const ChoosePlayerRoute: FC = () => {
  const commands = useCommands();
  const data = useLoaderData();
  const dispatch = useDispatch();
  const playerData = useSelector<RootState>((state) => state.app.players);
  const [players, setPlayers] = useState<Player[] | null>(null);

  useEffect(() => {
    commands.connectSocket();
  }, []);

  useEffect(() => {
    Logger.info('ChoosePlayerRoute datda', data);
    dispatch(addPlayers(data));
  }, [data]);

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
