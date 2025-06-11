import { Player } from '@jsix/be-db';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  players: Record<string, Player>;
  playerId?: string;
}

const initialState: AppState = {
  players: {},
  playerId: '',
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
    setPlayerId: (state, action: PayloadAction<string>) => {
      state.playerId = action.payload;
    },
  },
});

export const { addPlayers, setPlayerId } = appSlice.actions;

export default appSlice.reducer;
