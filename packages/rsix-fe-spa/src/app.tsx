import React, { FC } from 'react';
import { CommandsProvider } from './providers/commands';
import { MUIProvider } from './providers/mui';
import { ReduxProvider } from './providers/redux';
import { Routes } from './routes';

export const App: FC = () => {
  return (
    <MUIProvider>
      <ReduxProvider>
        <CommandsProvider>
          <Routes />
        </CommandsProvider>
      </ReduxProvider>
    </MUIProvider>
  );
};
