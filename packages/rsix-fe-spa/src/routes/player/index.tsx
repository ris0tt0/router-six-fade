import { useCurrentGames } from '@jsix/fe-redux/hooks/useCurrentGames';
import { useCurrentPlayer } from '@jsix/fe-redux/hooks/useCurrentPlayer';
import React, { FC, useEffect } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { UserDetails } from '../../api';
import { useCommands } from '../../hooks/useCommands';

const GamesList: FC = () => {
  const games = useCurrentGames();

  if (games) {
    const listItems = games.map((game) => {
      return (
        <li key={game.id}>
          <Link to={`/games/${game.id}`}>{game.title}</Link>
        </li>
      );
    });

    return (
      <div>
        <div>Games:</div>
        <ul>{listItems}</ul>
      </div>
    );
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
        <div>game ids:{player.gameIds}</div>
        <GamesList />
      </div>
    );

  return <div>no player!</div>;
};
