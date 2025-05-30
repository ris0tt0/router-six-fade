import Logger from 'js-logger';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { CommandsProvider } from './providers/commands';
import { MUIProvider } from './providers/mui';
import { RPCProvider } from './providers/rpc';
import { Routes } from './routes';

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5003');
    const handleOpen = (event: any) => {
      socket.send('r6 client');
    };
    const handleMessage = (event: any) => {
      console.log('Message from server ', event.data);
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

export const App: FC = () => {
  return (
    <MUIProvider>
      <RPCProvider>
        <SocketProvider>
          <CommandsProvider>
            <Routes />
          </CommandsProvider>
        </SocketProvider>
      </RPCProvider>
    </MUIProvider>
  );
};
