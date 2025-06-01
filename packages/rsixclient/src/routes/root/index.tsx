import { Button, styled } from '@mui/material';
import Logger from 'js-logger';
import React, { FC, useState } from 'react';
import { useCommands } from '../../hooks/useCommands';

const RootRouteStyled = styled('div')`
  margin: 15px;
`;

export const Root: FC = () => {
  const commands = useCommands();
  const [error, setError] = useState(false);

  const handleClick = () => {
    commands
      .loadPlayers()
      .then((result) => {
        Logger.info('loadplauers', result, commands);
      })
      .catch((e) => {
        Logger.error(e);
        setError(true);
      });
  };

  if (error) {
    return (
      <div>
        <h3>root error</h3>
      </div>
    );
  }

  return (
    <RootRouteStyled>
      <Button onClick={handleClick}>click</Button>
    </RootRouteStyled>
  );
};
