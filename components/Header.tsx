/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';

import {
  HeaderIcon,
  ThemeToggle,
  MobileMenu,
  Search,
  SignInOutButton,
} from '../components';
import {
  BellIcon,
  ChatIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  DotsVerticalIcon,
  ViewListIcon,
} from '@heroicons/react/solid';

import { FlagIcon, PlayIcon, ShoppingCartIcon } from '@heroicons/react/outline';

import { useSession } from 'next-auth/react';

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div
        className={` hidden sticky top-0 z-40  sm:flex items-center p-1 sm:p-[0.1rem]  lg:px-5 h-16 shadow-md 
     ${!theme ? 'themeLight ' : 'themeDark shadow-gray-800'}`}>
        {/* Left */}
        <div className='flex items-center'>
          <div className='ml-3 lg:ml-0 pt-2'>
            <Image
              src='/images/noWords.png'
              width={40}
              height={40}
              alt='logo'
              layout='fixed'
            />
          </div>
          {!session && <SignInOutButton login='signin' />}
          {session && <SignInOutButton login='signout' />}
          <Search />
        </div>
        {/*Center */}
        <div
          className={`flex ${
            session
              ? 'flex-grow justify-center mx-auto  xxxxl:mr-28'
              : 'ml-auto'
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
          <div className={` block mx-auto mr-8 w-28`}>
            <ThemeToggle />
          </div>
        )}

        {session && (
          <div className={`hidden xl:block mx-auto mr-8 w-28`}>
            <ThemeToggle />
          </div>
        )}

        {session && (
          <div className='flex items-center sm:gap-2 justify-end'>
            <div className=' hidden xl:flex items-center sm:gap-2'>
              <ViewGridIcon className='icon' />
              <ChatIcon className='icon' />
              <BellIcon className='icon' />
              {/* <ChevronDownIcon className='icon' /> */}
            </div>
          </div>
        )}

        {session && (
          <>
            <img
              className='h-10 rounded-full mx-2 '
              src={session.user?.image || 'https://i.imgur.com/MsZzedb.jpg'}
              alt=''
            />
            <ViewListIcon
              className={`xl:hidden h-8 block  ${
                !theme
                  ? 'themeLight text-gray-300 '
                  : 'themeDark  text-gray-200'
              }`}
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          </>
        )}

        <MobileMenu setOpenMenu={setOpenMenu} openMenu={openMenu} />
      </div>
    </>
  );
};
