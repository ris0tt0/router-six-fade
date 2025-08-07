import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

const HelloContainer = styled(Paper)`
  border: 1px red solid;
`;

export const HelloChat: FC = () => {
  return <HelloContainer>hello</HelloContainer>;
};
