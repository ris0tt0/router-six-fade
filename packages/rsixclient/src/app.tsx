import React, { FC } from 'react';
import { IApi } from '@jsix/api';
import { MUIProvider } from './providers/mui';
import { Routes } from './routes';

export const App: FC = () => {
  return (
    <MUIProvider>
      <Routes />
    </MUIProvider>
  );
};
