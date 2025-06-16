import { Button, styled } from '@mui/material';
import Logger from 'js-logger';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCommands } from '../../hooks/useCommands';
import { AppDispatch } from '../../store/redux';
import { addPlayers } from '../../store/slice/appSlice';

const RootRouteContainer = styled('div')`
  margin: 15px;
`;

export const RootRoute: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const commands = useCommands();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleClick = () => {
    commands
      .connectSocket()
      .then(() => {
        // dispatch(addPlayers(result));
        // navigate('/choose', { replace: true });
        // navigate('choose');
      })
      .catch((e: Error) => {
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
    <RootRouteContainer>
      <Button onClick={handleClick}>click</Button>
    </RootRouteContainer>
  );
};
