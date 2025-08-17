import { UUID } from '@jsix/be-db/model/index';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    socketId: UUID | null;
    playerId: string | null;
    isAuthed: boolean;
  }
}
