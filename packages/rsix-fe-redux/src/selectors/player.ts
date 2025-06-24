import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const playersSelector = (state: RootState) => state.player.players;
export const playerIdSelector = (state: RootState) => state.player.playerId;

export const currentPlayerSelector = createSelector(
  [playersSelector, playerIdSelector],
  (players, id) => {
    if (id) {
      const player = players[id] ?? null;
      if (player) return player;

      return null;
    }

    return null;
  }
);
