import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

import { HeaderIcon } from '.';
import { HomeIcon, UserGroupIcon } from '@heroicons/react/solid';

import { FlagIcon, PlayIcon, ShoppingCartIcon } from '@heroicons/react/outline';

export const MobileHeaderBottom = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={` flex sticky bottom-0 z-40  sm:hidden items-center p-1 h-16 shadow-md 
     ${!theme ? 'themeLight ' : 'themeDark shadow-gray-800'}`}>
        <div className={`flex-grow justify-center mx-auto px-6`}>
          <div className={`flex flex-grow justify-between  `}>
            <HeaderIcon active Icon={HomeIcon} />
            <HeaderIcon Icon={FlagIcon} />
            <HeaderIcon Icon={PlayIcon} />
            <HeaderIcon Icon={ShoppingCartIcon} />
            <HeaderIcon Icon={UserGroupIcon} />
          </div>
        </div>
      </div>
    </>
  );
};
