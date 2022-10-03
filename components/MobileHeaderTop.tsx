/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';

import {
  HeaderIcon,
  MobileMenu,
  Search,
  SignInOutButton,
  ThemeToggle,
} from '.';
import {
  BellIcon,
  ChatIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  DotsVerticalIcon,
} from '@heroicons/react/solid';

import {
  FlagIcon,
  PlayIcon,
  ShoppingCartIcon,
  ViewListIcon,
} from '@heroicons/react/outline';

import { useSession } from 'next-auth/react';

export const MobileHeaderTop = () => {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div
        className={`flex sticky top-0 z-40  sm:hidden items-center p-1 sm:p-[0.1rem]  lg:px-5 h-16 shadow-md 
     ${!theme ? 'themeLight ' : 'themeDark shadow-gray-800'}`}>
        {/* Left */}
        <div className='flex items-center gap-1'>
          <div className='ml-3 lg:ml-0 pt-2'>
            <Image
              src='/images/noWords.png'
              width={40}
              height={40}
              alt='logo'
              layout='fixed'
            />
          </div>
          <Search />
        </div>
        {/*Center */}
        <div
          className={`flex ${
            session ? 'flex-grow justify-center mx-auto' : 'ml-auto'
          }`}>
          {session && (
            <div
              className={`hidden sm:flex flex-grow justify-between max-w-xs lg:max-w-sm xl:max-w-md xxl:max-w-xl xxl:pr-10 xxxl:max-w-2xl xxxxl:max-w-5xl xxxxl:px-12 mx-auto  `}>
              <HeaderIcon active Icon={HomeIcon} />
              <HeaderIcon Icon={FlagIcon} />
              <HeaderIcon Icon={PlayIcon} />
              <HeaderIcon Icon={ShoppingCartIcon} />
              <HeaderIcon Icon={UserGroupIcon} />
            </div>
          )}
        </div>
        {/*Right */}

        {!session && (
          <div className={` block mx-auto  w-28`}>
            <ThemeToggle />
          </div>
        )}

        {session && (
          <div className={`hidden xl:block mx-auto mr-8 w-24`}>
            <ThemeToggle />
          </div>
        )}

        {session && (
          <div className='flex items-center sm:gap-2 justify-end'>
            <div className=' hidden xl:flex items-center sm:gap-2'>
              <ViewGridIcon className='icon' />
              <ChatIcon className='icon' />
              <BellIcon className='icon' />
            </div>
          </div>
        )}

        {session && (
          <>
            <img
              className='h-10 rounded-full mx-2'
              src={session.user?.image || 'https://i.imgur.com/MsZzedb.jpg'}
              alt=''
            />
            <ViewListIcon
              className={`xl:hidden h-8 block cursor-pointer mr-1 ${
                !theme ? 'themeLight text-gray-300' : 'themeDark  text-gray-200'
              }`}
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          </>
        )}
        <MobileMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
    </>
  );
};
