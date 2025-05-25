import Logger from 'js-logger';

Logger.useDefaults();

Logger.info('hello');

export const API = 'six';

export interface IApi {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;

  toUpperCase: (str: string) => string;
}
