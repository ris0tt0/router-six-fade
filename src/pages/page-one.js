import Logger from 'js-logger';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import { Outlet, useNavigate } from '../routes';

const PageOne = () => {
  const navigate = useNavigate();

  Logger.info('PageOne');

  return (
    <div className="absolute">
      page one
      <div className="p-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Est velit egestas
        dui id. At elementum eu facilisis sed odio morbi quis. Justo donec enim
        diam vulputate ut pharetra sit amet aliquam. Duis convallis convallis
        tellus id. Sit amet volutpat consequat mauris. Sit amet purus gravida
        quis blandit. Consequat id porta nibh venenatis cras sed felis. Id porta
        nibh venenatis cras sed felis. Dolor sit amet consectetur adipiscing
        elit pellentesque habitant. Tortor posuere ac ut consequat semper
        viverra nam. Pretium quam vulputate dignissim suspendisse in. Dignissim
        enim sit amet venenatis urna cursus eget nunc scelerisque. Id diam
        maecenas ultricies mi.
      </div>
      <div className="flex justify-center w-full space-x-5 border border-red-500 ">
        <button
          onClick={() => navigate('zero')}
          className="p-2 border border-orange-400 rounded"
        >
          zero
        </button>
        <button
          onClick={() => navigate('one')}
          className="p-2 border border-orange-400 rounded"
        >
          one
        </button>
        <button
          onClick={() => navigate('two')}
          className="p-2 border border-orange-400 rounded"
        >
          two
        </button>
        <button
          onClick={() => navigate('three')}
          className="p-2 border border-orange-400 rounded"
        >
          three
        </button>
      </div>
      <div className="absolute">
        <Outlet />
      </div>
    </div>
  );
};

export default PageOne;
