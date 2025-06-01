import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { RPCContext } from '../contexts/rpc';
import { ClientRPC, ClientRPCImpl } from '../server/rpc';

export const RPCProvider: FC<PropsWithChildren> = ({ children }) => {
  const [rpc, setRPC] = useState<ClientRPC | null>(null);

  useEffect(() => {
    const rpc = new ClientRPCImpl();
    rpc.init().then(() => setRPC(rpc));
  }, []);

  if (rpc === null) return null;

  return <RPCContext.Provider value={rpc}>{children}</RPCContext.Provider>;
};
