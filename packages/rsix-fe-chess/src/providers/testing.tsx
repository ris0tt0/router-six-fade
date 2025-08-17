import { Player, StatusOffline, UUID } from '@jsix/be-db/model/data';
import { ChessType, GameDataTypes } from '@jsix/be-db/model/data/apps';
import { addDatas } from '@jsix/fe-redux/store/slice/dataSlice';
import {
  addPlayers,
  setPlayerId,
} from '@jsix/fe-redux/store/slice/playerSlice';
import { FC, PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';

export const GAME_ID = 'aaba-aaab-aaaa-aaac-aadd' as UUID;
export const PLAYER_ONE_ID = 'baba-aaab-aaaa-aaac-aadd' as UUID;
export const PLAYER_TWO_ID = 'caba-aaab-aaaa-aaac-aadd' as UUID;

export const Game = {
  id: GAME_ID,
  lightPlayerId: PLAYER_ONE_ID,
  darkPlayerId: PLAYER_TWO_ID,
  activePlayerId: PLAYER_ONE_ID,
  type: ChessType,
  moves: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
} as GameDataTypes;

export const Player1 = {
  name: 'jackson one',
  id: PLAYER_ONE_ID,
  status: StatusOffline,
  gameIds: [GAME_ID],
} as Player;
export const Player2 = {
  name: 'William Gates',
  id: PLAYER_TWO_ID,
  status: StatusOffline,
  gameIds: [GAME_ID],
} as Player;

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();

  dispatch(addPlayers([Player1, Player2]));
  dispatch(addDatas([Game]));
  dispatch(setPlayerId(PLAYER_ONE_ID));

  return children;
};
