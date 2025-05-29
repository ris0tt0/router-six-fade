import Logger from 'js-logger';
import { WebSocketServer } from 'ws';

export class SocketServer {
  private wss: WebSocketServer | null = null;

  async init() {
    Logger.info('SocketServer::init');
    this.wss = new WebSocketServer({ port: 5003 });
    this.addEventListeners();

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
