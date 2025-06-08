export interface WsRPC {
  sendMessage(message: string): Promise<void>;
}
