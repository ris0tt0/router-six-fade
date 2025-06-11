import React, { FC } from 'react';
import { CommandsProvider } from './providers/commands';
import { MUIProvider } from './providers/mui';
import { ReduxProvider } from './providers/redux';
import { RPCProvider } from './providers/rpc';
import { Routes } from './routes';

export const App: FC = () => {
  return (
    <MUIProvider>
      <ReduxProvider>
        <RPCProvider>
          <CommandsProvider>
            <Routes />
          </CommandsProvider>
        </RPCProvider>
      </ReduxProvider>
    </MUIProvider>
  );
};
