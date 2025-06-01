import React, { FC } from 'react';
import { CommandsProvider } from './providers/commands';
import { MUIProvider } from './providers/mui';
import { RPCProvider } from './providers/rpc';
import { WebSocketProvider } from './providers/ws';
import { Routes } from './routes';

export const App: FC = () => {
  return (
    <MUIProvider>
      <RPCProvider>
        <WebSocketProvider>
          <CommandsProvider>
            <Routes />
          </CommandsProvider>
        </WebSocketProvider>
      </RPCProvider>
    </MUIProvider>
  );
};
