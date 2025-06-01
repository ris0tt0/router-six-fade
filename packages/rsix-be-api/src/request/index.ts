import { Request, Response } from 'express';
import { RpcServer } from '../server/rcp';

export const RCPRequest = async (req: Request, res: Response) => {
  try {
    // get the accepted language, use "en" as fallback
    const lang = req.headers['accept-language']?.split(',')?.[0] || 'en';

    // call the rpc function and pass the additional context
    const result = await RpcServer.handleAPIRequest(req, { lang });

    // send the result back to the client
    await res.send(result);
    return;
  } catch (e) {
    await res.send(res);
    return;
  }
};
