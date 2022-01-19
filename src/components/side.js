import React from 'react';
// import { useNavigate } from '../routes';
import { useNavigate } from 'react-router-dom';

const buttonClass =
  'border border-red-500 rounded m-3bg-pink-100 p-3font-light background hover:bg-pink-200';

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-5 space-y-2 bg-purple-200">
      <button onClick={() => navigate('page1')} className={buttonClass}>
        One
      </button>
      <button onClick={() => navigate('page2')} className={buttonClass}>
        Two
      </button>
      <button onClick={() => navigate('page3')} className={buttonClass}>
        Three
      </button>
    </div>
  );
};

export default SideBar;
