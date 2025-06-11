import Logger from 'js-logger';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCommands } from '../hooks/useCommands';
import { addPlayers, setPlayerId } from '../store/slice/appSlice';
import { Initable } from '@jsix/be-db';

interface WebSocketClient extends Initable {}

export class WeSocketClientImpl implements WebSocketClient {
  async init() {
    // Initialization logic if needed
    return null;
  }
}

export const WebSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  // const commands = useCommands();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5003');
    const handleOpen = (event: any) => {
      // socket.send('r6 client');
      Logger.info('Socket Provider-Connected to server', event);
    };
    const handleMessage = (event: MessageEvent) => {
      const result = JSON.parse(event.data);
      if (result.type === 'message') {
        Logger.log('Socket Provider-Message from server', result);
      } else if (result.type === 'players') {
        Logger.log('Socket Provider-Players data', result.data);
        dispatch(addPlayers(result.data));
      } else if (result.type === 'connected') {
        Logger.info('Socket Provider-Connected to server', result);
        dispatch(setPlayerId(result.data));
        // commands.setPlayerWsId(result.data);
      } else {
        Logger.warn('Socket Provider-Unknown message type', result);
      }
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
    };
  }, []);

  return children;
};
