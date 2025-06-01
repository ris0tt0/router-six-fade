import { styled } from '@mui/material';
import React, { FC } from 'react';

const CheckersOneContainerStyled = styled('div')`
  border: 1px red solid;
`;

export const CheckersOne: FC = () => {
  return <CheckersOneContainerStyled>Checkers one</CheckersOneContainerStyled>;
};
