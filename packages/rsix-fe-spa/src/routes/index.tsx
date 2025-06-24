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
import { GamesRoute } from './games';
import { GamesRouteDetail } from './games/gameDetail';

const ChooseLoader = async (args: any) => {
  const rpc = ClientRPCImpl.getInstace();

  const players = await rpc.loadPlayers();
  Logger.info('ChooseLoader', players, args);

  return players;
};

const RootLoader = async (args: LoaderFunctionArgs) => {
  const api = ClientApiImpl.getInstance();
  const currentPath = new URL(args.request.url).pathname;
  const result = await api.getUserDetails();

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
      {
        path: 'player',
        Component: PlayerRoute,
      },
      {
        path: 'games',
        children: [
          { index: true, Component: GamesRoute },
          { path: ':gameId', Component: GamesRouteDetail },
        ],
      },
    ],
  },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
