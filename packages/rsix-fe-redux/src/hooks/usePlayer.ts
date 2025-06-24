import { UUID } from '@jsix/be-db/interface/data';
import { useSelector } from 'react-redux';
import { playersSelector } from '../selectors/player';

/**
 * This hook returns a Player by id.
 * @param id Tha player id
 * @returns Player object or null.
 */
export const usePlayer = (id?: UUID) => {
  const players = useSelector(playersSelector);

  if (id) {
    const player = players[id];

    if (player) {
      return player;
    }
  }
  return null;
};
