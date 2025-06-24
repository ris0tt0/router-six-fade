import { UUID } from '@jsix/be-db/interface/data';
import { useSelector } from 'react-redux';
import { datasSelector } from '../selectors/data';

/**
 * This hook returns the data by data id.
 * @param id data id to look up
 * @returns GameDataType object or null
 */
export const useData = (id?: UUID) => {
  const datas = useSelector(datasSelector);

  if (id) {
    const data = datas[id];

    if (data) {
      return data;
    }
  }
  return null;
};
