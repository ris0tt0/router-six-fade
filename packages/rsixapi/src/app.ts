import { RPCFunctions } from '@node-rpc/server';
import Logger from 'js-logger';
import { IApi } from './common';

// define a custom context interface, which will be passed to each rpc function
interface IContext {
  lang: string;
}

const api: RPCFunctions<IApi, IContext> = {
  add: (a: number, b: number) => () => a + b,
  subtract: (a: number, b: number) => () => a - b,

  toLocaleString: (num: number) => (context: IContext) =>
    num.toLocaleString(context.lang),
};

Logger.useDefaults();

Logger.info('hello');

export const APP = 'aa';
