## @jsix/be-api

This package serves as the backend API layer for the Router Six Fade monorepo. It’s built with Node.js and Express, and exposes both RESTful endpoints and RPC-style functions for communicating with the shared database layer.

### Tech Stack
- Node.js – JavaScript runtime for backend

- Express – Lightweight and fast HTTP server

- TypeScript – Full type safety

- RPC over local function bindings – Strongly typed internal calls to the database package

- Yarn PnP / Monorepo – Shared dependencies and tight integration across packages

### Features
- RESTful endpoints for client-facing operations

- Internal RPC methods for accessing the database safely and consistently

- Shared types with the database layer for end-to-end type safety

- Centralized error handling and validation logic

- Designed to work within a Yarn PnP monorepo with workspace isolation

### Project Structure
```pgsql
/api
├── src
│ ├── index.ts # App entry point
│ ├── routes/ # Express route handlers
│ ├── rpc/ # Internal RPC functions
│ └── middleware/ # Middleware utilities
├── package.json
└── tsconfig.json
```
### Getting Started
#### Install dependencies

```bash
yarn install
```
Run this from the root of the monorepo. Yarn will automatically link workspace packages.

#### Start the server
```bash
yarn workspace @router-six-fade/api dev
```
#### Build for production
```bash
yarn workspace @router-six-fade/api build
```
### RPC Integration
This package connects to the @router-six-fade/db package using RPC-style function calls (local imports). This allows full type safety and avoids the need for HTTP overhead between internal services.

```ts
// Example: Calling a DB method via RPC
import { getUserById } from '@router-six-fade/db'

const user = await getUserById('abc-123')
```
### License
MIT
