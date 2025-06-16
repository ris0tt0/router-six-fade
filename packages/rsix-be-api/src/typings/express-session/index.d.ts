import 'express-session';

declare module 'express-session' {
  interface SessionData {
    playerId: string | null;
    isAuthed: boolean;
  }
}
