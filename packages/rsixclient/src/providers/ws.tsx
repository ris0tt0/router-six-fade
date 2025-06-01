import Logger from 'js-logger';
import { FC, PropsWithChildren, useEffect } from 'react';

export const WebSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5003');
    const handleOpen = () => {
      socket.send('r6 client');
    };
    const handleMessage = (event: any) => {
      Logger.log('Socket Provider-Message from server ', event.data);
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
