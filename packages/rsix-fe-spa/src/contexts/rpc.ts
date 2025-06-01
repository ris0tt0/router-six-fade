import { createContext } from 'react';
import { ClientRPC } from '../server/rpc';

export const RPCContext = createContext<ClientRPC>({} as ClientRPC);
