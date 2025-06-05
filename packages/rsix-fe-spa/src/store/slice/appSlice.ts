import { Player } from '@jsix/be-db';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  players: Record<string, Player>;
}

const initialState: AppState = {
  players: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addPlayers: (state, action: PayloadAction<Player[]>) => {
      action.payload.forEach((player) => {
        state.players[player.id] = player;
      });
    },
  },
});

export const { addPlayers } = appSlice.actions;

export default appSlice.reducer;
