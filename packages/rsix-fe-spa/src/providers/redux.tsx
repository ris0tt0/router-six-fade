import React, { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@jsix/fe-redux/store/index';

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
