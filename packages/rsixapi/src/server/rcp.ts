import { createServer } from '@node-rpc/server';
import { jsonDeserializer } from '@node-rpc/server/dist/deserializers/jsonDeserializer';
import { api } from '../api';

const RpcServer = createServer({
  api,
  deserializer: jsonDeserializer,
});

export { RpcServer };
