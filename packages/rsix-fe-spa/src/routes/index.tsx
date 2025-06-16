import React, { FC } from 'react';
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { ClientApiImpl } from '../api';
import { AboutRoute } from './about';
import { ChoosePlayerRoute } from './choose';
import { Login } from './login';
import { PlayerRoute } from './player';
import Logger from 'js-logger';
import { ClientRPCImpl } from '../rpc/client';

const ChooseLoader = async () => {
  const rpc = ClientRPCImpl.getInstace();

  const players = await rpc.loadPlayers();

  return players;
};

const PlayerLoader = async () => {};

const RootLoader = async (args: LoaderFunctionArgs) => {
  const api = ClientApiImpl.getInstance();
  const currentPath = new URL(args.request.url).pathname;
  const result = await api.getUserDetails();

  Logger.info('RootLoader result', currentPath, result);

  if (!result.isAuthed) {
    return redirect('/login');
  }

  if (result.id === null && currentPath !== '/choose') {
    return redirect('/choose');
  }
  if (result.id && currentPath !== '/player') {
    return redirect('/player');
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
    id: 'app',
    loader: RootLoader,
    Component: ProtectedRoute,
    HydrateFallback: RootLoading,
    children: [
      {
        path: 'choose',
        loader: ChooseLoader,
        HydrateFallback: RootLoading,
        Component: ChoosePlayerRoute,
      },
      { path: 'player', Component: PlayerRoute },
    ],
  },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
