import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { FC } from 'react';
import { AboutRoute } from './about';
import { RootRoute } from './root';
import { ChoosePlayerRoute } from './choose';
import { PlayerRoute } from './player';

const router = createBrowserRouter([
  { path: '/about', Component: AboutRoute },
  { path: '/choose', Component: ChoosePlayerRoute },
  { path: '/player', Component: PlayerRoute },
  { path: '/', Component: RootRoute },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
