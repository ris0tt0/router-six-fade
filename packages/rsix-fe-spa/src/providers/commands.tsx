import React, { FC, PropsWithChildren } from 'react';
import { ClientCommands } from '../commands';
import { Commands } from '../commands/commands';
import { CommandsContext } from '../contexts/commands';
import { useRPC } from '../hooks/useRPC';

export const CommandsProvider: FC<PropsWithChildren> = ({ children }) => {
  const rpc = useRPC();
  const commands: ClientCommands = new Commands({ rpc });

  return (
    <CommandsContext.Provider value={commands}>
      {children}
    </CommandsContext.Provider>
  );
};
