import { styled } from '@mui/material';
import React, { FC } from 'react';

const ChoosePlayersContainerStyled = styled('div')`
  display: flex;
  padding: 20px;
  border: 1px red solid;
`;

export const ChoosePlayer: FC = () => {
  return <ChoosePlayersContainerStyled>choose</ChoosePlayersContainerStyled>;
};
