import { Button, styled } from '@mui/material';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { useRPC } from '../../hooks/useRPC';
import { useCommands } from '../../hooks/useCommands';

const RootRouteStyled = styled('div')`
  margin: 15px;
`;

export const Root: FC = () => {
  const rpc = useRPC();
  const commands = useCommands();

  const handleClick = () => {
    rpc
      .loadPlayers()
      .then((result) => {
        Logger.info('resiltss', result, commands);
      })
      .catch((e) => Logger.warn(e));
  };

  return (
    <RootRouteStyled>
      <Button onClick={handleClick}>click</Button>
    </RootRouteStyled>
  );
};
