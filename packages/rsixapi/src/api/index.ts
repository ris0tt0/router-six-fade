import { RPCFunctions } from '@node-rpc/server';
import { IApi } from '../common';

export interface IContext {
  lang: string;
}

export const api: RPCFunctions<IApi, IContext> = {
  add: (a: number, b: number) => () => a + b,
  subtract: (a: number, b: number) => () => a - b,

  toLocaleString: (num: number) => (context: IContext) =>
    num.toLocaleString(context.lang),
};
