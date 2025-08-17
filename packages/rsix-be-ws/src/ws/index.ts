import { Initable } from '@jsix/be-db/model';
import { Player, StatusOffline, UUID } from '@jsix/be-db/model/data';
import { GameDataTypes } from '@jsix/be-db/model/data/apps';
import { ClientDbRpc } from '@jsix/be-db/model/rpc';
import { randomUUID } from 'crypto';
import Logger from 'js-logger';
import { WebSocketServer } from 'ws';

const PORT = process.env.WS_PORT;

export type PlayerData = {
  playerId: UUID | null;
  sessionId: string | null;
  socketId: UUID;
};
export interface SocketServer extends Initable {
  sendMessage(message: string): Promise<void>;
  sendPlayers(players: Player[]): Promise<void>;
  setPlayerIdSocketId({
    socketId,
    playerId,
  }: {
    socketId: UUID;
    playerId: string;
  }): Promise<void>;
  setSessionIdSocketId({
    socketId,
    sessionId,
  }: {
    socketId: UUID;
    sessionId: string;
  }): Promise<void>;
  updateGameDatas(ids: UUID[], datas: GameDataTypes[]): Promise<null>;
}

export class SocketServerImpl implements SocketServer {
  public isInitialized: boolean = false;
  private clientDbRpc: ClientDbRpc;
  private wss: WebSocketServer | null = null;
  private ids = new Map<WebSocket, PlayerData>();

  constructor(clientDbRpc: ClientDbRpc) {
    this.clientDbRpc = clientDbRpc;
  }

  async init() {
    if (PORT) {
      this.wss = new WebSocketServer({ port: parseInt(PORT, 10) });
      this.addEventListeners();

      this.isInitialized = true;
      Logger.info('SocketServer::init', PORT);
    }

    return null;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }

  async updateGameDatas(ids: UUID[], datas: GameDataTypes[]) {
    Logger.info('SocketServer::updateGameDatas', ids, datas);

    ids.map((id) => {
      const entries = Array.from(this.ids.entries());
      entries.some(([ws, data]) => {
        if (data.playerId === id) {
          Logger.info('updateGmedatas', ids);

          const messageToSend = JSON.stringify({
            type: 'updateGameDatas',
            data: datas,
          });

          ws.send(messageToSend);

          return true;
        }
        return false;
      });
    });

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
  async setPlayerIdSocketId({
    socketId,
    playerId,
  }: {
    socketId: UUID;
    playerId: UUID;
  }) {
    Logger.info('SocketServer::setPlayerIdSocketId', socketId, playerId);

    const ids = Array.from(this.ids.entries()).find(
      ([, value]) => value.socketId === socketId
    );

    if (ids) {
      const item = this.ids.get(ids[0]);
      Logger.info('setPlayerIdSocketId item', item);
      if (item) {
        const updatedItem: PlayerData = {
          ...item,
          playerId,
        };
        this.ids.set(ids[0], updatedItem);
      }
    }

    return;
  }

  async setSessionIdSocketId({
    socketId,
    sessionId,
  }: {
    socketId: UUID;
    sessionId: string;
  }) {
    Logger.info('SocketServer::setSessionIdSocketId', socketId, sessionId);

    const ids = Array.from(this.ids.entries()).find(
      ([, value]) => value.socketId === socketId
    );
    if (ids) {
      const item = this.ids.get(ids[0]);
      Logger.info('setSessionIdSocketId item', item);
      if (item) {
        const updatedItem: PlayerData = {
          ...item,
          sessionId,
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
    const playerData = this.ids.get(event.target as WebSocket);
    if (playerData?.playerId) {
      this.clientDbRpc
        .getPlayer(playerData.playerId)
        .then((player) => {
          const updated: Player = {
            ...player,
            status: StatusOffline,
          };
          return updated;
        })
        .then((player) => this.clientDbRpc.setPlayer(player))
        .then((player) => this.sendPlayers([player]))
        .finally(() => this.ids.delete(event.target as WebSocket));
    }
    Logger.info(
      'SocketServer::onClose - connection closed',
      playerData,
      this.ids
    );
  };
  private onConnection = (ws: WebSocket) => {
    ws.addEventListener('error', this.onError);
    ws.addEventListener('message', this.onMessage);
    ws.addEventListener('close', this.onClose);

    const id = randomUUID;
    const socketId = id();

    this.ids.set(ws, {
      playerId: null,
      sessionId: null,
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
