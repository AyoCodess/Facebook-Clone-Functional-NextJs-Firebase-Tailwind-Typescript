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

import { useSession, signIn, signOut } from 'next-auth/react';

export const Header = () => {
  const { data: session } = useSession();
  return (
    <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'>
      {/* Left */}
      <div className='flex items-center'>
        <Image
          src='/images/noWords.png'
          width={40}
          height={40}
          alt='logo'
          layout='fixed'
        />
        {!session && <button onClick={() => signIn()}>Sign In</button>}
        {session && <button onClick={() => signOut()}>Sign Out</button>}
        <div className='flex ml-2 items-center rounded-full bg-gray-100 p-2'>
          <SearchIcon className='h-6 text-gray-600' />
          <input
            type='text'
            className=' hidden md:inline-flex  ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink'
            placeholder='Search Metaspace'
          />
        </div>
      </div>
      {/*Center */}
      <div className='flex justify-center flex-grow'>
        <div className='flex gap-6 md:gap-2'>
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/*Right */}
      <div className='flex items-center sm:gap-2 justify-end'>
        {/*profile pic */}
        <p className='whitespace-nowrap font-semibold pr-3'>Ayo Adesanya</p>
        <ViewGridIcon className='icon' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
    </div>
  );
};
