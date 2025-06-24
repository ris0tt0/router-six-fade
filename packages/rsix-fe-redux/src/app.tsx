import React, { FC } from 'react';
import { MUIProvider } from './providers/mui';
import { ReduxProvider } from './providers/redux';

export const App: FC = () => {
  return (
    <MUIProvider>
      <ReduxProvider>redux</ReduxProvider>
    </MUIProvider>
  );
};
