import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
