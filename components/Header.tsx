import Image from 'next/image';

import React, { useContext } from 'react';
import { ThemeContext } from '../Context';

import { HeaderIcon, ThemeToggle } from '../components';
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
  const { theme, setTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  return (
    <div
      className={`sticky top-0 z-50  flex items-center p-2  lg:px-5 shadow-md 
     ${!theme ? 'themeLight ' : 'themeDark shadow-gray-800'}`}>
      {/* Left */}
      <div className='flex items-center'>
        <div className='ml-3 lg:ml-0'>
          <Image
            src='/images/noWords.png'
            width={40}
            height={40}
            alt='logo'
            layout='fixed'
          />
        </div>
        {!session && (
          <button
            className={`py-2 px-3 rounded-full w-24 ml-5  ${
              !theme
                ? 'themeLight bg-blue-500 text-white '
                : ' themeDark shadow border border-white'
            }`}
            onClick={() => signIn()}>
            Sign In
          </button>
        )}

        {session && (
          <button
            className={`py-2 px-3 rounded-full w-24 ml-5  ${
              !theme
                ? 'themeLight bg-blue-500 text-white '
                : 'themeDark shadow border border-white'
            }`}
            onClick={() => signOut()}>
            Sign Out
          </button>
        )}
        <div className='flex ml-2 xl:ml-10 items-center rounded-full bg-gray-100 p-2 '>
          <SearchIcon className='h-6 text-gray-600 ' />
          <input
            type='text'
            className=' hidden md:inline-flex  ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink'
            placeholder='Search Metaspace'
          />
        </div>
      </div>
      {/*Center */}
      <div
        className={`flex  ${
          session ? 'flex-grow justify-center mx-auto' : 'ml-auto'
        }`}>
        <div className='flex gap-6 md:gap-2'>
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/*Right */}
      <div className={`mx-auto mr-8 w-24`}>
        <ThemeToggle />
      </div>

      {session && (
        <div className='flex items-center sm:gap-2 justify-end'>
          <img className='h-10 rounded-full mr-2' src={session.user?.image!} />
          <p
            className={`whitespace-nowrap font-semibold pr-3 ${
              !theme ? 'themeLight' : 'themeDark'
            } `}>
            {session.user?.name}
          </p>
          <ViewGridIcon className='icon' />
          <ChatIcon className='icon' />
          <BellIcon className='icon' />
          <ChevronDownIcon className='icon' />
        </div>
      )}
    </div>
  );
};
