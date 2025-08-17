import { GameDataTypes } from '@jsix/be-db/model/data/apps';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import Logger from 'js-logger';

export interface DataState {
  data: Record<string, GameDataTypes>;
}

const initialState: DataState = {
  data: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addDatas: (state, action: PayloadAction<GameDataTypes[]>) => {
      Logger.info('dataSlice::addDatas', action);
      action.payload.forEach((data) => {
        state.data[data.id] = data;
      });
    },
  },
});

export const { addDatas } = dataSlice.actions;

export default dataSlice.reducer;
