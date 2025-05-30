import React, { FC, PropsWithChildren, useEffect } from 'react';
import { MUIProvider } from './providers/mui';
import Logger from 'js-logger';

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  Logger.info('SocketProvider');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5003');
    const handleOpen = (event: any) => {
      socket.send('Hello Server!');
    };
    const handleMessage = (event: any) => {
      console.log('Message from server ', event.data);
    };
    // Connection opened
    socket.addEventListener('open', handleOpen);

    // Listen for messages
    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
    };
  }, []);

  return children;
};

export const App: FC = () => {
  return (
    <MUIProvider>
      <SocketProvider>
        <div>chat app</div>
      </SocketProvider>
    </MUIProvider>
  );
};
