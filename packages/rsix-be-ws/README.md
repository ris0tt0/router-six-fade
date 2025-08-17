# @jsix/be-ws
The @jsix/be-ws package is the WebSocket server responsible for delivering real-time updates to clients in the JSIX ecosystem. It connects to the database layer (@jsix/be-db) via RPC using @node-rpc/client, and uses @node-rpc/server to optionally expose additional handlers.

This service is designed to listen to relevant backend events and push updates via WebSockets to subscribed clients.

## Tech Stack
- Node.js – Runtime for the server

- WebSocket – Real-time communication with clients

- @node-rpc/client – Makes typed calls to the database package (@jsix/be-db)

- @node-rpc/server – Can expose local handlers for inter-service use

- Axios – Used for external HTTP calls or internal service polling

- TypeScript – Ensures full type safety across RPC and WebSocket messages

## Responsibilities
- Maintains persistent WebSocket connections with clients

- Sends push updates in real-time when data changes or triggers occur

- Fetches data via RPC from @jsix/be-db

- May expose internal RPC methods (for triggering broadcasts, etc.)

- Acts as a middleman between core data and subscribed UIs

## Structure Overview
```bash
/be-ws
├── src
│ ├── index.ts # Server entry point
│ ├── ws/ # WebSocket server logic and connection handling
│ ├── rpc/ # Client for calling @jsix/be-db
│ ├── handlers/ # Optional: RPC handlers this server exposes
│ └── utils/ # Helpers for broadcasting, subscriptions, etc.
├── package.json
└── tsconfig.json
```
## Getting Started
### Install dependencies
```bash
yarn install
```
Run from the root of the monorepo.

### Start the WebSocket server
```bash
yarn workspace @jsix/be-ws dev
```
### Build for production
```bash
yarn workspace @jsix/be-ws build
```
### WebSocket Behavior
- When a client connects, a WebSocket session is created and tracked

- Server can push updates based on:

  - Database changes (via RPC to @jsix/be-db)

  - External triggers or polling mechanisms (via Axios)

  - Manual RPC calls to this server from other internal services

### Example push payload:
```json
{
"type": "update",
"payload": {
"userId": "abc-123",
"status": "online"
}
}
```
### RPC Client to @jsix/be-db
```ts
import { createRpcClient } from '@node-rpc/client'
import type { DbRpcSchema } from '@jsix/be-db'

const db = createRpcClient<DbRpcSchema>('http://localhost:4000')

// Use in a broadcast
const user = await db.getUserById('abc-123');
```
### RPC Server
This server may also expose a lightweight RPC interface using @node-rpc/server, allowing other services to trigger WebSocket messages programmatically.

### License
MIT
