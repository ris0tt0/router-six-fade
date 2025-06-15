import React, { FC } from 'react';
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { ClientApiImpl } from '../api';
import { AboutRoute } from './about';
import { ChoosePlayerRoute } from './choose';
import { PlayerRoute } from './player';
import { RootRoute } from './root';
import { Login } from './login';

const RootLoader = async () => {
  const api = ClientApiImpl.getInstance();

  const result = await api.getPlayerId();

  if (result.id === null) {
    return redirect('/login');
  }

  return result;
};

const RootLoading = () => {
  return <div>loading root</div>;
};

const ProtectedRoute = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  { path: '/about', Component: AboutRoute },
  { path: '/login', Component: Login },
  {
    path: '/',
    loader: RootLoader,
    Component: ProtectedRoute,
    HydrateFallback: RootLoading,
    children: [
      { path: '/', Component: PlayerRoute },
      { path: 'choose', Component: ChoosePlayerRoute },
    ],
  },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
