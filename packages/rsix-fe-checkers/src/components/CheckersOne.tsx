import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

const CheckersOneContainer = styled('div')`
  border: 1px red solid;
`;

export const CheckersOne: FC = () => {
  return <CheckersOneContainer>Checkers one</CheckersOneContainer>;
};
