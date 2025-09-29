import 'express-session';

type UUID = `${string}-${string}-${string}-${string}-${string}`;

declare module 'express-session' {
  interface SessionData {
    socketId: UUID | null;
    playerId: string | null;
    isAuthed: boolean;
  }
}
