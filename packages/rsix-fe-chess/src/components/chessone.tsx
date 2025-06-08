import { styled } from '@mui/material';
import React, { FC } from 'react';

const ChessOneContainer = styled('div')`
  border: 1px red solid;
`;

export const ChessOne: FC = () => {
  return <ChessOneContainer>chess one</ChessOneContainer>;
};
