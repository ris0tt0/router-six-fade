import { ChessGameData } from '@jsix/be-db/interface/data/apps';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { Board } from './components/board';
import { DashBoard } from './components/dashBoard';
import { MUIProvider } from './providers/mui';
import { ReduxProvider } from './providers/redux';
import { DataProvider, GAME_ID } from './providers/testing';

export const App: FC = () => {
  const handleChessGameUpdate = (data: ChessGameData) => {
    Logger.info('App::chess', data);
  };
  return (
    <MUIProvider>
      <ReduxProvider>
        <DataProvider>
          <DashBoard />
          <Board dataId={GAME_ID} onGameUpdate={handleChessGameUpdate} />
        </DataProvider>
      </ReduxProvider>
    </MUIProvider>
  );
};
