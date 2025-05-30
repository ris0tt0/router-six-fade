import { useContext } from 'react';
import { RPCContext } from '../contexts/rpc';

export const useRPC = () => {
  const rpc = useContext(RPCContext);

  return rpc;
};
