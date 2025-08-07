# Router Six Fade

Router Six Fade is a modern, full-stack monorepo application built entirely with TypeScript. It leverages modern frontend and backend technologies to deliver a high-performance, modular, and type-safe experience.

## Tech Stack

### Frontend

- React – Component-based UI library

- Redux – Global state management

- IndexedDB – Client-side persistent storage for offline-first experience

- TypeScript – Static typing for safer, cleaner code

### Backend

- Node.js + Express – REST API + RPC-style endpoints for database operations

- TypeScript – Shared types across client and server

- RPC-style architecture – Enables strongly typed calls directly from client to server

### Tooling

- Yarn (Berry) with Plug'n'Play (PnP) – Zero-install dependency management with improved performance and modularity

- Monorepo Architecture – Unified workspace for frontend and backend, promoting code sharing and consistency

## Features

- Modular codebase with isolated packages

- Uses React Router v6 for modern routing patterns

- Built-in caching and persistence with IndexedDB

- Fully typed API requests and RPC handlers

- Fast local development and reliable builds using Yarn PnP

## Getting Started

### Prerequisites

- Yarn 3+ (Berry)

- Node.js (v18+ recommended)

### Install dependencies

```bash
yarn
```

### Support for VSCode

```bash
yarn dlx @yarnpkg/sdks vscode
```

### Run the development server

```bash
yarn dev
```

### Build for production

```bash
yarn build:prod
```

## Development Notes

- This app uses Webpack Module Federation (optional, include only if applicable)

- Redux is used alongside React Hooks for fine-grained control of application state

- IndexedDB is used for long-term storage of key data like cached API results

- The backend exposes both REST and RPC-style endpoints for maximum flexibility

## License

This project is licensed under the MIT License.
