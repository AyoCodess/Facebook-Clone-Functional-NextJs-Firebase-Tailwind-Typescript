import Image from 'next/image';

import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';

import { HeaderIcon, ThemeToggle } from '../components';
import {
  BellIcon,
  ChatIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  DotsVerticalIcon,
  ViewListIcon,
} from '@heroicons/react/solid';

import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';

import { useSession, signIn, signOut } from 'next-auth/react';

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { setViewEveryonesPosts, viewEveryonesPosts } = useContext(DataContext);
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div
        className={`sticky top-0 z-40  flex items-center p-1 sm:p-[0.1rem]  lg:px-5 h-16 shadow-md 
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
                  : ' themeDark shadow border border-white hover:bg-blue-500 hover:border-0'
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
                  : 'themeDark shadow border border-white hover:bg-blue-500 hover:border-0'
              }`}
              onClick={() => signOut()}>
              Sign Out
            </button>
          )}
          <div
            className={`flex ml-2 2xl:ml-5 items-center rounded-full bg-gray-100 p-2 `}>
            <SearchIcon className='h-6 text-gray-600 ' />
            <input
              type='text'
              className={` hidden ${
                !session ? 'md:inline-flex' : '2xl:inline-flex'
              }  ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink`}
              placeholder='Search Metaspace'
            />
          </div>
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
          <div className={` block mx-auto mr-8 w-24`}>
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
              {/* <ChevronDownIcon className='icon' /> */}
            </div>
          </div>
        )}

        {session && (
          <>
            <img
              className='h-10 rounded-full mx-2'
              src={session.user?.image!}
            />
            <DotsVerticalIcon
              className='xl:hidden icon block'
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          </>
        )}
        {/*Mobile view */}
        {session && openMenu && (
          <div className=' xl:hidden absolute bottom-[-19rem] right-0 w-42 mr-5 animate-popUp w-[17rem] '>
            <div
              className={` flex flex-col gap-2 p-3   rounded-lg ${
                !theme
                  ? 'lightTheme bg-white shadow'
                  : 'darkTheme bg-slate-700 shadow-sm shadow-slate-400'
              }`}>
              <ThemeToggle className='mb-1' />
              <div
                className={`flex gap-2 items-center cursor-pointer rounded-xl p-2 ${
                  !theme
                    ? 'lightTheme hover:bg-gray-100'
                    : 'darkTheme hover:bg-blue-500'
                }`}
                onClick={() => setViewEveryonesPosts((prev) => !prev)}>
                <ViewListIcon className='icon block' />
                <p className={`font-medium `}>{`${
                  !viewEveryonesPosts
                    ? "View Everyone's Posts"
                    : ' View Your Posts'
                }`}</p>
              </div>
              <div
                className={`flex gap-2 items-center  rounded-xl p-2 ${
                  !theme
                    ? 'lightTheme hover:bg-gray-100'
                    : 'darkTheme hover:bg-blue-500'
                }`}>
                <ViewGridIcon className='icon block' />
                <p className='font-medium'> More</p>
              </div>
              <div
                className={`flex gap-2 items-center rounded-xl p-2 ${
                  !theme
                    ? 'lightTheme hover:bg-gray-100'
                    : 'darkTheme hover:bg-blue-500'
                }`}>
                <ChatIcon className='icon block' />
                <p className='font-medium'> Messenger</p>
              </div>
              <div
                className={`flex gap-2 items-center rounded-xl p-2 ${
                  !theme
                    ? 'lightTheme hover:bg-gray-100'
                    : 'darkTheme hover:bg-blue-500'
                }`}>
                <BellIcon className='icon block' />
                <p className='font-medium'> Notifications</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
