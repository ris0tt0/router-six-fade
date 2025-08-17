import { UUID } from '@jsix/be-db/model/data';
import { useSelector } from 'react-redux';
import { gamesSelector } from '../selectors/games';

/**
 * This hook returns the game by game id.
 * @param id game id to look up
 * @returns Game object or null
 */
export const useGame = (id?: UUID) => {
  const games = useSelector(gamesSelector);

  if (id) {
    const game = games[id];

    if (game) {
      return game;
    }
  }
  return null;
};
