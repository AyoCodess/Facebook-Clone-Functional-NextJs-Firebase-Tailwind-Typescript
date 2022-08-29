import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/solid';

import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import { Menu } from '@headlessui/react';

import { SignInOutButton, ThemeToggle } from '../components';
import {
  BellIcon,
  ChatIcon,
  DotsHorizontalIcon,
  FolderRemoveIcon,
  UploadIcon,
  ViewGridIcon,
  ViewListIcon,
} from '@heroicons/react/solid';

import { useSession } from 'next-auth/react';
import { Dialog, Transition } from '@headlessui/react';
import { MobileMenuButton } from './MobileMenuButton';

interface Props {
  postEmailRef: any;
  openDropdownMenu: boolean;
  setOpenDropdownMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostDropdownMenu = ({
  postEmailRef,
  openDropdownMenu,
  setOpenDropdownMenu,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();
  return (
    <div className=''>
      <Menu as='div' className='relative inline-block text-left z-50'>
        <div>
          <Menu.Button>
            <DotsHorizontalIcon
              onClick={() => setOpenDropdownMenu(true)}
              className={`p-2 h-10 rounded-full transition duration-200 cursor-pointer ${
                !theme
                  ? 'lightTheme hover:bg-gray-100 text-gray-600'
                  : 'darkTheme hover:bg-blue-500 '
              }`}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items
            className={`absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              !theme
                ? 'lightTheme bg-white'
                : 'darkTheme bg-slate-700 shadow shadow-black'
            }`}>
            <div className='px-1 py-1 '>
              {session.user.email === postEmailRef?.current?.innerText && (
                <Menu.Item>
                  <MobileMenuButton
                    title='Update Post'
                    Icon={UploadIcon}
                    onClick={() => {
                      console.log(postEmailRef.current.innerText);
                    }}
                  />
                </Menu.Item>
              )}
              {session.user.email === postEmailRef?.current?.innerText && (
                <Menu.Item>
                  <MobileMenuButton
                    title='Delete Post'
                    Icon={FolderRemoveIcon}
                    onClick={() => {}}
                  />
                </Menu.Item>
              )}
              {session.user.email !== postEmailRef?.current?.innerText && (
                <Menu.Item>
                  <MobileMenuButton title='Cannot Edit' Icon={XIcon} />
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
