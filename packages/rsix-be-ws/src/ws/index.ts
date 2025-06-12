import { Initable, Player } from '@jsix/be-db';
import { randomUUID, UUID } from 'crypto';
import Logger from 'js-logger';
import { WebSocketServer } from 'ws';

export interface SocketServer extends Initable {
  sendMessage(message: string): Promise<void>;
  sendPlayers(players: Player[]): Promise<void>;
  setPlayerIdSocketId(playerId: string, socketId: string): Promise<void>;
}

type PlayerSocket = {
  playerId?: string;
  socketId: UUID;
};
export class SocketServerImpl implements SocketServer {
  private wss: WebSocketServer | null = null;
  private ids = new Map<WebSocket, PlayerSocket>();

  async init() {
    Logger.info('SocketServer::init');
    this.wss = new WebSocketServer({ port: 5003 });
    this.addEventListeners();

    return null;
  }
  async sendMessage(message: string) {
    Logger.info('SocketServer::sendMessage', message, this.wss?.clients.size);
    this.wss?.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        const messageToSend = JSON.stringify({
          type: 'message',
          data: message,
        });
        client.send(messageToSend);
      } else {
        Logger.warn('SocketServer::sendMessage - client not open', client);
      }
    });
    return;
  }
  async setPlayerIdSocketId(playerId: string, socketId: string) {
    Logger.info('SocketServer::setPlayerIdSocketId', playerId, socketId);

    const ids = Array.from(this.ids.entries()).find(
      ([, value]) => value.socketId === socketId
    );
    if (ids) {
      const item = this.ids.get(ids[0]);
      if (item) {
        const updatedItem: PlayerSocket = {
          ...item,
          playerId: playerId,
        };
        this.ids.set(ids[0], updatedItem);
      }
    }

    return;
  }
  async sendPlayers(players: Player[]) {
    Logger.info('SocketServer::sendPlayers', players);
    this.wss?.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        const messageToSend = JSON.stringify({
          type: 'players',
          data: players,
        });
        client.send(messageToSend);
      } else {
        Logger.warn('SocketServer::sendPlayers - client not open', client);
      }
    });
    return;
  }
  private onError = (error: Event) => {
    Logger.error('SocketServer::onError - error occurred:', this, error);
  };
  private onMessage = (event: MessageEvent) => {
    // not implemented because the client doesn't send a ws message.
    // the socket server has RCP for api access
    Logger.info('SocketServer::onMessage - received:', this, event.data);
  };
  private onClose = (event: CloseEvent) => {
    const userId = this.ids.get(event.target as WebSocket);
    Logger.info('SocketServer::onClose - connection closed', userId);
  };
  private onConnection = (ws: WebSocket) => {
    ws.addEventListener('error', this.onError);
    ws.addEventListener('message', this.onMessage);
    ws.addEventListener('close', this.onClose);

    const id = randomUUID;
    const socketId = id();

    this.ids.set(ws, {
      playerId: undefined,
      socketId,
    });

    const messageToSend = JSON.stringify({
      type: 'connected',
      data: socketId,
    });
    ws.send(messageToSend);
  };
  addEventListeners() {
    if (this.wss) {
      Logger.info('SocketServer::addEventListeners');

      this.wss.addListener('connection', this.onConnection);
    }
  }
  removeEventListeners() {
    if (this.wss) {
      Logger.info('SocketServer::removeEventListeners');
      this.wss.clients.forEach((client) => {
        client.removeEventListener('error', Logger.error);
        // client.removeEventListener('message', this.onMessage);
        // client.removeEventListener('close', this.onClose);
      });
      this.wss.removeListener('connection', this.onConnection);
    }
  }
}
