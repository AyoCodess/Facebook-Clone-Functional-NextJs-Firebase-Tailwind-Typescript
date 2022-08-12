import Image from 'next/image';
import React from 'react';
import { HeaderIcon } from '../components';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';

import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';

export const Header = () => {
  return (
    <div>
      {/* Left */}
      <div className='flex items-center'>
        <Image
          src='/images/noWords.png'
          width={40}
          height={40}
          alt='logo'
          layout='fixed'
        />
        <div className='flex ml-2 items-center rounded-full bg-gray-100 p-2'>
          <SearchIcon className='h-6 text-gray-600' />
          <input
            type='text'
            className=' flex ml-2 bg-transparent outline-none placeholder-gray-500'
            placeholder='Search Metaspace'
          />
        </div>
      </div>
      {/*Center */}
      <div className='flex justify-center flex-grow'>
        <div className='flex gap-6 md:gap-2'>
          <HeaderIcon Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/*Right */}
      <div></div>
    </div>
  );
};
