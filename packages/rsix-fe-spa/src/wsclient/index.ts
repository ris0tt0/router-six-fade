import { addDatas } from '@jsix/fe-redux/store/slice/dataSlice';
import { addPlayers } from '@jsix/fe-redux/store/slice/playerSlice';
import { Dispatch } from '@reduxjs/toolkit';
import Logger from 'js-logger';

const URL = process.env.WS_URL;

export interface WebSocketClient {
  wsid: string | null;
  connect(): Promise<string>;
}

export class WebSocketClientImpl implements WebSocketClient {
  public wsid: string | null = null;

  private socket: WebSocket | null = null;
  private readonly dispatch: Dispatch;

  constructor({ dispatch }: { dispatch: Dispatch }) {
    this.dispatch = dispatch;
  }

  connect() {
    const retVal = new Promise<string>((resolve, reject) => {
      if (URL) {
        this.socket = new WebSocket(URL);
        const handleMessage = (event: MessageEvent) => {
          const result = JSON.parse(event.data);
          if (result.type === 'connected') {
            this.wsid = result.data;
            resolve(result.data);
            this.socket?.removeEventListener('message', handleMessage);
          }
        };

        this.socket.addEventListener('open', this.handleOpen);
        this.socket.addEventListener('close', this.handleClose);
        this.socket.addEventListener('message', this.handleMessage);
        this.socket.addEventListener('message', handleMessage);
      } else {
        reject(new Error('WebSocket URL is not defined'));
      }
    });

    return retVal;
  }

  private handleOpen = (event: any) => {
    Logger.info('WebSocketClientImpl::handleOpen', event);
  };
  private handleClose = (event: CloseEvent) => {
    Logger.info('WebSocketClientImpl::handleClose', event);
    this.socket?.removeEventListener('message', this.handleMessage);
    this.socket?.removeEventListener('open', this.handleOpen);
    this.socket?.removeEventListener('close', this.handleClose);
    this.socket = null;
    this.wsid = null;
  };
  private handleMessage = (event: MessageEvent) => {
    const result = JSON.parse(event.data);
    if (result.type === 'message') {
      Logger.log('WebSocketClientImpl::message', result.data);
    } else if (result.type === 'players') {
      Logger.log('WebSocketClientImpl::players', result.data);
      this.dispatch(addPlayers(result.data));
    } else if (result.type === 'updateGameDatas') {
      Logger.log('WebSocketClientImpl::updateGameDatas', result.data);
      this.dispatch(addDatas(result.data));
    } else {
      Logger.warn('WebSocketClientImpl unknown type:', result.type);
    }
  };
}
