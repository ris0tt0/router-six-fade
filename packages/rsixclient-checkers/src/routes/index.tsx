import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { FC } from 'react';
import { About } from './about';
import { Root } from './root';

const router = createBrowserRouter([
  { path: '/about', Component: About },
  { path: '/', Component: Root },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
