import { Game } from '@jsix/be-db/interface/data';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { currentPlayerSelector } from './player';

export const gamesSelector = (state: RootState) => state.game.games;

export const currentGamesSelector = createSelector(
  [gamesSelector, currentPlayerSelector],
  (games, player) => {
    if (player) {
      const result = player.gameIds.reduce((retVal, id) => {
        const game = games[id];

        if (game) {
          retVal.push(game);
        }

        return retVal;
      }, [] as Game[]);

      return result;
    }

    return null;
  }
);
