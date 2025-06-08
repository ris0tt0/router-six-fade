import { Paper, styled } from '@mui/material';
import React, { FC } from 'react';

const HelloContainer = styled(Paper)`
  border: 1px red solid;
`;

export const HelloChat: FC = () => {
  return <HelloContainer>hello</HelloContainer>;
};
