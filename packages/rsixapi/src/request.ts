import { IncomingMessage, ServerResponse } from 'http';
import { RpcServer } from './server';

const request = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // get the accepted language, use "en" as fallback
    const lang = req.headers['accept-language']?.split(',')?.[0] || 'en';

    // call the rpc function and pass the additional context
    const result = await RpcServer.handleAPIRequest(req, { lang });

    // send the result back to the client
    res.send(result);
  } catch (e) {
    return await res.end(res, 500, e.message);
  }
};

// now you can add it for example as a route in express
// => app.post("/", request)

// or export it as default function for micro
// => export default request
