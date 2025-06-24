import { useSelector } from 'react-redux';
import { currentGamesSelector } from '../selectors/games';

/**
 * Returns the Games for the player.
 * @returns the current games for the player
 */
export const useCurrentGames = () => {
  const games = useSelector(currentGamesSelector);

  return games;
};
