import React, { FC, PropsWithChildren } from 'react';
import { ClientCommands } from '../commands';
import { SpaCommands } from '../commands/commands';
import { CommandsContext } from '../contexts/commands';
import { useRPC } from '../hooks/useRPC';
import { useDispatch } from 'react-redux';

export const CommandsProvider: FC<PropsWithChildren> = ({ children }) => {
  const rpc = useRPC();
  const dispatch = useDispatch();
  const commands: ClientCommands = new SpaCommands({ rpc, dispatch });

  return (
    <CommandsContext.Provider value={commands}>
      {children}
    </CommandsContext.Provider>
  );
};
