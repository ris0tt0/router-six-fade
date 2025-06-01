import React, { FC } from 'react';
import { MUIProvider } from './providers/mui';

export const App: FC = () => {
  return (
    <MUIProvider>
      <div>chat app</div>
    </MUIProvider>
  );
};
