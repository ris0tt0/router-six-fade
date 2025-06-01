import { createContext } from 'react';
import { ClientCommands } from '../commands';

export const CommandsContext = createContext<ClientCommands>(
  {} as ClientCommands
);
