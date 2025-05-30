import { Paper, styled } from '@mui/material';
import React, { FC } from 'react';

const HelloContainerStyled = styled(Paper)`
  border: 1px red solid;
`;

export const HelloChat: FC = () => {
  return <HelloContainerStyled>hello</HelloContainerStyled>;
};
