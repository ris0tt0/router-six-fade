import Logger from 'js-logger';
import { app } from './server/express';

Logger.useDefaults();

Logger.info('hello', app);

export const APP = 'aa';
