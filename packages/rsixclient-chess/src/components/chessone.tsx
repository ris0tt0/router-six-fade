import { styled } from '@mui/material';
import React, { FC } from 'react';

const ChessOneContainerStyled = styled('div')`
  border: 1px red solid;
`;

export const ChessOne: FC = () => {
  return <ChessOneContainerStyled>chess one</ChessOneContainerStyled>;
};
