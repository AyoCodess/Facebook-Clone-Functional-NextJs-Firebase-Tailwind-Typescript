import React, { useContext, useRef, Fragment } from 'react';
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
  openDropdownMenu: boolean;
  setOpenDropdownMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostDropdownMenu2 = ({
  openDropdownMenu,
  setOpenDropdownMenu,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const getLink = useRef(null);
  return (
    <>
      <menu className='absolute right-[15rem] z-50'>
        <Menu as='div'>
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

          {({ open }) => (
            <>
              {/* Use the Transition component. */}
              <Transition
                show={openDropdownMenu}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'>
                {/* Mark this component as `static` */}
                <div
                  className={`  absolute animate-popUp mr-5  bg-white rounded-lg  transform transition-all h-40 w-60 ${
                    !theme
                      ? 'lightTheme bg-white  shadow-xl '
                      : 'darkTheme bg-slate-700  shadow-slate-400'
                  }`}>
                  <div>
                    {session && (
                      <div className={` flex flex-col gap-2 p-3 my-2  `}>
                        <div className='flex items-center gap-1'>
                          <hr className='mx-auto w-10 border-2' />
                        </div>
                        <Menu.Items>
                          <Menu.Item>
                            <MobileMenuButton
                              title='Update Post'
                              Icon={UploadIcon}
                              onClick={() => {
                                setOpenDropdownMenu(false);
                              }}
                            />
                          </Menu.Item>
                          <Menu.Item>
                            <MobileMenuButton
                              title='Delete Post'
                              Icon={FolderRemoveIcon}
                              onClick={() => {
                                setOpenDropdownMenu(false);
                              }}
                            />
                          </Menu.Item>
                        </Menu.Items>
                      </div>
                    )}
                  </div>
                </div>
              </Transition>
            </>
          )}
        </Menu>
      </menu>
    </>
  );
};
