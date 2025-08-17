import { UUID } from '@jsix/be-db/model/data';
import { GameDataTypes } from '@jsix/be-db/model/data/apps';
import { addDatas } from '@jsix/fe-redux/store/slice/dataSlice';
import { addGames } from '@jsix/fe-redux/store/slice/gamesSlice';
import {
  addPlayers,
  setPlayerId,
} from '@jsix/fe-redux/store/slice/playerSlice';
import { Dispatch } from '@reduxjs/toolkit';
import Logger from 'js-logger';
import { ClientCommands } from '.';
import { ClientApi } from '../api';
import { ClientRPC } from '../rpc/client';
import { WebSocketClient } from '../wsclient';

export type CommandsParams = {
  api: ClientApi;
  rpc: ClientRPC;
  socket: WebSocketClient;
  dispatch: Dispatch;
};
export class ClientCommandsImpl implements ClientCommands {
  public isInitialized: boolean = false;

  private readonly api: ClientApi;
  private readonly rpc: ClientRPC;
  private readonly dispatch: Dispatch;
  private readonly socketClient: WebSocketClient;

  constructor({ dispatch, api, rpc, socket }: CommandsParams) {
    this.api = api;
    this.rpc = rpc;
    this.socketClient = socket;
    this.dispatch = dispatch;
  }
  async init() {
    await this.rpc.init();
    this.isInitialized = true;
    return null;
  }
  async destroy() {
    this.isInitialized = false;
    return null;
  }
  async connectSocket() {
    if (this.socketClient.wsid === null) {
      const id = await this.socketClient.connect();
      await this.rpc.setWsId(id);
    }

    return null;
  }
  async choosePlayer(playerId: UUID) {
    Logger.info('choosePlayer', playerId);
    await this.rpc.choosePlayer(playerId);

    const [currentPlayer] = await this.rpc.getPlayers([playerId]);
    const games = await this.rpc.getGames(currentPlayer.gameIds);

    const allIds = games.reduce((retVal, game) => {
      game.ownerIds.forEach((id) => {
        retVal.add(id);
      });
      game.playerIds.forEach((id) => {
        retVal.add(id);
      });

      return retVal;
    }, new Set<UUID>());

    const gameIds = games.reduce((retVal, game) => {
      retVal.push(game.dataId);
      return retVal;
    }, [] as UUID[]);

    const gameDatas = await this.rpc.getDatas(gameIds);

    const allPlayers = await this.rpc.getPlayers(Array.from(allIds));

    Logger.info(
      'commands::choosePlayer1',
      gameIds,
      gameDatas,
      this.socketClient.wsid
    );
    Logger.info(`commands::choosePlayer ${playerId} player`, allPlayers[0]);

    this.dispatch(addGames(games));
    this.dispatch(addDatas(gameDatas));
    this.dispatch(addPlayers([...allPlayers, currentPlayer]));
    this.dispatch(setPlayerId(currentPlayer.id));

    return allPlayers[0];
  }

  async setPlayerWsId(id: string) {
    const result = await this.rpc.setWsId(id);
    return null;
  }

  async updateGameData(datas: GameDataTypes[]) {
    const results = await this.rpc.updateDatas(datas);

    return results;
  }
}
