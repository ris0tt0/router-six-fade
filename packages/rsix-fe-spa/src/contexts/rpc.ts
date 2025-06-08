import { createContext } from 'react';
import { ClientRPC } from '../rpc/client';

export const RPCContext = createContext<ClientRPC>({} as ClientRPC);
