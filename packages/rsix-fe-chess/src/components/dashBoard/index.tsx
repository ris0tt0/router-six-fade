import { UUID } from '@jsix/be-db/interface/data';
import { setPlayerId } from '@jsix/fe-redux/store/slice/playerSlice';
import { FormControl, MenuItem, Paper, Select, styled } from '@mui/material';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Player1,
  Player2,
  PLAYER_ONE_ID,
  PLAYER_TWO_ID,
} from '../../providers/testing';

const DashBoardContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;

export const DashBoard: FC = () => {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState<UUID>(PLAYER_ONE_ID);

  const handleChange = (event: any) => {
    setPlayer(event.target.value);
    dispatch(setPlayerId(event.target.value));
  };

  return (
    <DashBoardContainer>
      <div>testing for chess board.</div>
      <div>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={player}
            label="player"
            onChange={handleChange}
          >
            <MenuItem value={PLAYER_ONE_ID}>{Player1.name}</MenuItem>
            <MenuItem value={PLAYER_TWO_ID}>{Player2.name}</MenuItem>
          </Select>
        </FormControl>
      </div>
    </DashBoardContainer>
  );
};
