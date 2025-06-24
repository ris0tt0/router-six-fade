import { useSelector } from 'react-redux';
import { currentPlayerSelector } from '../selectors/player';

/**
 * This returns the current player.
 * @returns the logined Player
 */
export const useCurrentPlayer = () => {
  const player = useSelector(currentPlayerSelector);

  return player;
};
