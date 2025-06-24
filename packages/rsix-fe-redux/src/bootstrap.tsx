import Logger from 'js-logger';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const node = document.getElementById('rsix-redux');

if (process.env.NODE_ENV === 'development') {
  Logger.useDefaults();
}

if (node) {
  const root = createRoot(node);

  root.render(<App />);
}
