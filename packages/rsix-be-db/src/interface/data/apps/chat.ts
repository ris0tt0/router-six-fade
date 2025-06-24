import { UUID } from '../constants';

/**
 * the chat game type
 */
export const ChatType = 'rsix-chat-type';

/**
 * the chat game data
 */
export interface ChatGameData {
  id: UUID;
  type: typeof ChatType;
}
