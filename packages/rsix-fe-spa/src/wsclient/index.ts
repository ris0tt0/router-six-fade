import { Dispatch } from '@reduxjs/toolkit';
import Logger from 'js-logger';
import { addPlayers, setPlayerId } from '../store/slice/appSlice';

export interface WebSocketClient {
  connect(): Promise<string>;
}

export class WebSocketClientImpl implements WebSocketClient {
  private socket: WebSocket | null = null;
  private readonly dispatch: Dispatch;

  constructor({ dispatch }: { dispatch: Dispatch }) {
    this.dispatch = dispatch;
  }

  connect() {
    const retVal = new Promise<string>((resolve, reject) => {
      this.socket = new WebSocket('ws://localhost:5003');
      const handleMessage = (event: MessageEvent) => {
        const result = JSON.parse(event.data);
        if (result.type === 'connected') {
          resolve(result.data);
        }
        this.socket?.removeEventListener('message', handleMessage);
      };

      this.socket.addEventListener('open', this.handleOpen);
      this.socket.addEventListener('message', this.handleMessage);
      this.socket.addEventListener('message', handleMessage);
    });

    return retVal;
  }

  private handleOpen = (event: any) => {
    Logger.info('WebSocketClientImpl::handleOpen', event);
  };
  private handleMessage = (event: MessageEvent) => {
    const result = JSON.parse(event.data);
    if (result.type === 'message') {
      Logger.log('WebSocketClientImpl::message', result.data);
    } else if (result.type === 'players') {
      Logger.log('WebSocketClientImpl::players', result.data);
      this.dispatch(addPlayers(result.data));
    } else {
      Logger.warn('WebSocketClientImpl unknown type:', result.type);
    }
  };
}
