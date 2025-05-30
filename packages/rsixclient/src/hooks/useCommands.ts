import { useContext } from 'react';
import { CommandsContext } from '../contexts/commands';

export const useCommands = () => {
  const commands = useContext(CommandsContext);

  return commands;
};
