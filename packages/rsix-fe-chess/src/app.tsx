import React, { FC } from 'react';
import { MUIProvider } from './providers/mui';
import { Board } from './board';

export const App: FC = () => {
  return (
    <MUIProvider>
      <h2>chess app</h2>
      <Board />
    </MUIProvider>
  );
};
