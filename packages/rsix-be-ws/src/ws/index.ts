import { Initable, Player } from '@jsix/be-db';
import Logger from 'js-logger';
import { WebSocketServer } from 'ws';

export interface SocketServer extends Initable {
  sendMessage(message: string): Promise<void>;
  sendPlayers(players: Player[]): Promise<void>;
}
export class SocketServerImpl implements SocketServer {
  private wss: WebSocketServer | null = null;

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
  addEventListeners() {
    if (this.wss) {
      Logger.info('SocketServer::addEventListeners');

      this.wss.addListener('connection', (ws) => {
        Logger.info('SocketServer::addEventListeners - connection established');
        ws.addEventListener('error', Logger.error);
        ws.addEventListener('message', (event) => {
          Logger.log('SocketServer::addEventListeners - received:', event.data);
        });
        ws.addEventListener('close', (event) => {
          Logger.info(
            'SocketServer::addEventListeners - connection closed',
            event
          );
        });
        const messageToSend = JSON.stringify({
          type: 'connected',
          data: 'Welcome to the WebSocket server!',
        });
        ws.send(messageToSend);
      });
    }
  }
}
