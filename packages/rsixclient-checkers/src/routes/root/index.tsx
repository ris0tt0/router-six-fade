import React, { FC, useEffect } from 'react';

import { IApi } from '@jsix/api';
import { Initable } from '@jsix/db';
import { Button } from '@mui/material';
import { Callables, createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';

class ClientRPC implements Initable {
  private api: Callables<IApi> | null = null;
  async init() {
    Logger.info('ClientRPC::init');
    this.api = createClient<IApi>({
      endpoint: 'api/v1',
      serializer: jsonSerializer,
      xhr: axiosXHR,
    });
    return null;
  }

  async subtrack(item1: number, item2: number) {
    if (this.api) {
      const response = await this.api.subtract(item1, item2).call();

      switch (response.type) {
        case 'fail': {
          Logger.log('error', response.code, response.error);
          break;
        }
        case 'noResponse': {
          Logger.log('no response');
          break;
        }
        case 'success': {
          Logger.log('success', response.code, response.data);
          break;
        }
      }
    }
  }
}

export const Root: FC = () => {
  // useEffect(() => {
  //   Logger.info('Root component');
  // }, []);
  // const handleClick = () => {
  //   CallRPC().then(() => Logger.info('completes'));
  // };
  const handleClick = () => null;
  return (
    <div>
      root:<Button onClick={handleClick}>click</Button>
    </div>
  );
};
