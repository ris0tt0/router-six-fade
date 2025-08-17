import { Player } from '@jsix/be-db/model/data';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface PlayerState {
  players: Record<string, Player>;
  playerId: string | null;
}

const initialState: PlayerState = {
  players: {},
  playerId: null,
};

export const playerSlice = createSlice({
  name: 'player',
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

export const { addPlayers, setPlayerId } = playerSlice.actions;

export default playerSlice.reducer;
