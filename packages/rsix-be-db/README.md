## @jsix/be-db
The @jsix/be-db package is the RPC-backed database access layer for the JSIX platform. It exposes a set of structured and type-safe functions for reading and writing data to the application's database. This package is designed to work in conjunction with other services via RPC, using @node-rpc/server.

### Tech Stack
- Node.js – Backend runtime

- Express – Lightweight HTTP server used for hosting the RPC API

- @node-rpc/server – Framework for type-safe RPC calls over HTTP

- TypeScript – Fully typed interfaces and implementation

- Yarn PnP (Plug'n'Play) – Fast, modular dependency management in a monorepo context

### Responsibilities
- Acts as the central point for all database interactions (queries, inserts, updates, deletes)

- Exposes these actions via RPC endpoints using @node-rpc/server

- Shares type definitions with consumers for full end-to-end type safety

- Isolated package within a modern Yarn PnP monorepo, promoting modularity

### Structure Overview
```pgsql
/be-db
├── src
│ ├── index.ts # RPC server entry point
│ ├── handlers/ # RPC method implementations (CRUD, queries)
│ ├── types/ # Shared types and interfaces
│ └── db/ # Database connection/config logic
├── package.json
└── tsconfig.json
```
### Getting Started
#### Install dependencies
```bash
yarn
```
Run from the root of the monorepo. Yarn PnP will handle linking this workspace package.

#### Run the RPC server
```bash
yarn workspace @jsix/be-db dev
```
#### Build for production
```bash
yarn workspace @jsix/be-db build
```
### RPC Server
This package uses @node-rpc/server to expose all database functionality as RPC endpoints.

#### Example usage from another service:
```ts
import { createRpcClient } from '@node-rpc/client'
import type { DbRpcSchema } from '@jsix/be-db'

const db = createRpcClient<DbRpcSchema>('http://localhost:4000')

// Fetch user by ID
const user = await db.getUserById('abc-123')
```
- All RPC methods are registered from the handlers/ directory

- Types are exposed via a schema to ensure compile-time safety

### Database Layer
- You can implement support for SQL, NoSQL, or in-memory stores here.

- DB access is abstracted so services consuming this package do not touch the database directly — they always go through typed RPC calls.

### License
MIT
