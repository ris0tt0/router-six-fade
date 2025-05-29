import React, { FC, useEffect } from 'react';

import { IApi } from '@jsix/api';
import { createClient } from '@node-rpc/client';
import { jsonSerializer } from '@node-rpc/client/dist/serializers/jsonSerializer';
import { axiosXHR } from '@node-rpc/client/dist/xhr/axios';
import Logger from 'js-logger';
import { Button } from '@mui/material';

const api = createClient<IApi>({
  endpoint: 'api/v1',
  serializer: jsonSerializer,
  xhr: axiosXHR,
});

const CallRPC = async () => {
  const response = await api.subtract(11, 4).call();

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
};

export const Root: FC = () => {
  useEffect(() => {
    Logger.info('Root component');
  }, []);
  const handleClick = () => {
    CallRPC().then(() => Logger.info('completes'));
  };

  return (
    <div>
      root:<Button onClick={handleClick}>click</Button>
    </div>
  );
};
