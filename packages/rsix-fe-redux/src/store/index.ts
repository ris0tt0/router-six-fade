import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice/dataSlice';
import gameReducer from './slice/gamesSlice';
import appReducer from './slice/playerSlice';

export const store = configureStore({
  reducer: {
    player: appReducer,
    game: gameReducer,
    data: dataReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
