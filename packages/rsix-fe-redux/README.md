## @jsix/fe-redux

The @jsix/fe-redux package provides a centralized, shareable Redux store for JSIX frontend applications. Built with modern Redux patterns and fully typed with TypeScript, it exposes a collection of state slices, selectors, hooks, and even the store instance itself, enabling local development and tight integration across federated frontends.

### Purpose
This package abstracts Redux logic out of individual frontend apps and offers a reusable state layer that can be:

- Imported directly into multiple React applications

- Used with Module Federation or local development setups

- Shared across MFEs to ensure state consistency during development

### Tech Stack
- Redux Toolkit – For efficient slice and reducer definitions

- React Redux – For hooks and provider integration

- TypeScript – For fully typed store, actions, selectors, and hooks

- IndexedDB (optional) – For persistent or cached slices, depending on app needs

### Features
- Pre-configured and typed Redux store

- Exposes standard hooks: useSelector, useDispatch, and custom domain hooks

- Exposes selectors for accessing specific slice data

- Allows external consumption of the Redux store for local dev and integration testing

- Supports hydration or preloading of data if needed

### Directory Overview

```bash
/fe-redux
├── src
│   ├── store.ts             # Redux store configuration
│   ├── slices/              # Individual state slices
│   ├── hooks/               # Custom hooks (e.g. useAuth, useSettings)
│   ├── selectors/           # Exported selector functions
│   └── types/               # Type declarations
├── package.json
└── tsconfig.json
```
### Getting Started
#### Install dependencies
```bash
yarn install
```
#### Build the package
```bash
yarn workspace @jsix/fe-redux build
```
This package is intended to be consumed by other frontends, not run directly.

### Usage
In a consuming React app:
```ts
import { store, Provider } from '@jsix/fe-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
### Accessing selectors and hooks:
```ts
import { useAuth } from '@jsix/fe-redux/hooks'
import { selectUser } from '@jsix/fe-redux/selectors'

const user = useSelector(selectUser)
```
### Store Reuse in Local Dev
This package was designed to allow multiple frontends to share the same Redux logic during local development. This enables:

- Testing shared state logic across apps

- Avoiding duplication of Redux boilerplate

- Ensuring consistent behavior between MFEs

In production, this logic is typically encapsulated within each MFE. This package primarily powers local dev environments, integration testing, or shared dev tools.

### License
MIT