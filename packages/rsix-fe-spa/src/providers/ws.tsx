import Logger from 'js-logger';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayers } from '../store/slice/appSlice';

export const WebSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5003');
    const handleOpen = () => {
      // socket.send('r6 client');
      Logger.info('Socket Provider-Connected to server');
    };
    const handleMessage = (event: MessageEvent) => {
      const result = JSON.parse(event.data);
      if (result.type === 'message') {
        Logger.log('Socket Provider-Message from server', result);
      } else if (result.type === 'players') {
        Logger.log('Socket Provider-Players data', result.data);
        dispatch(addPlayers(result.data));
      } else {
        Logger.warn('Socket Provider-Unknown message type', result);
      }
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
    };
  }, []);

  return children;
};
