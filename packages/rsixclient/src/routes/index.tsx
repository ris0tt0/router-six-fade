import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { FC } from 'react';
import { About } from './about';
import { Root } from './root';
import { ChoosePlayer } from './choose';

const router = createBrowserRouter([
  { path: '/about', Component: About },
  { path: '/choose', Component: ChoosePlayer },
  { path: '/', Component: Root },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
