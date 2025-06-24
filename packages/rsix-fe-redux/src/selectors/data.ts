import { RootState } from '../store';

export const datasSelector = (state: RootState) => state.data.data;
