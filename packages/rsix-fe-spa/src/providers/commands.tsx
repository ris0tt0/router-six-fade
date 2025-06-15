import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ClientCommands } from '../commands';
import { ClientCommandsImpl } from '../commands/commands';
import { CommandsContext } from '../contexts/commands';
import { ClientRPCImpl } from '../rpc/client';
import { WebSocketClient, WebSocketClientImpl } from '../wsclient';
import Logger from 'js-logger';
import { ClientApiImpl } from '../api';

export const CommandsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const [commands, setCommands] = useState<ClientCommands | null>(null);
  const [socket, setSocket] = useState<WebSocketClient | null>(null);

  useEffect(() => {
    const rpc = new ClientRPCImpl();
    const api = ClientApiImpl.getInstance();
    const socket = new WebSocketClientImpl({ dispatch });

    const commands: ClientCommands = new ClientCommandsImpl({
      rpc,
      api,
      dispatch,
      socket,
    });

    commands.init().then(() => {
      Logger.info('Commands initialized');
      setCommands(commands);
    });

    setSocket(socket);
  }, []);

  if (commands === null) {
    return null; // or a loading spinner
  }

  return (
    <CommandsContext.Provider value={commands}>
      {children}
    </CommandsContext.Provider>
  );
};
