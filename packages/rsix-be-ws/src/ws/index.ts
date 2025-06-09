import { Initable } from '@jsix/be-db';
import Logger from 'js-logger';
import { WebSocketServer } from 'ws';

export interface SocketServer extends Initable {
  sendMessage(message: string): Promise<void>;
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
        client.send(message);
      } else {
        Logger.warn('SocketServer::sendMessage - client not open', client);
      }
    });
    return;
  }
  addEventListeners() {
    if (this.wss) {
      Logger.info('SocketServer::addEventListeners');
      this.wss.on('connection', function connection(ws) {
        ws.on('error', Logger.error);

        ws.on('message', function message(data) {
          Logger.log('received:', data);
        });

        ws.send('connected');
      });
    }
  }
}
