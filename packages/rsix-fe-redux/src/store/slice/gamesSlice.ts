import { Game } from '@jsix/be-db/model/data';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GameState {
  games: Record<string, Game>;
}

const initialState: GameState = {
  games: {},
};

export const gamesSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addGames: (state, action: PayloadAction<Game[]>) => {
      action.payload.forEach((game) => {
        state.games[game.id] = game;
      });
    },
  },
});

export const { addGames } = gamesSlice.actions;

export default gamesSlice.reducer;
