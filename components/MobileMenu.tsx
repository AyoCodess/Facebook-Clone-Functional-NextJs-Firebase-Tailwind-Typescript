import React, { useContext, useState, useRef, Fragment } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';

import { ThemeToggle } from '../components';
import {
  BellIcon,
  ChatIcon,
  ViewGridIcon,
  ViewListIcon,
} from '@heroicons/react/solid';

import { useSession } from 'next-auth/react';
import { Dialog, Transition } from '@headlessui/react';
import { MobileMenuButton } from './MobileMenuButton';

interface Props {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileMenu = ({ openMenu, setOpenMenu }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { setViewEveryonesPosts, viewEveryonesPosts, modalOpen, setModalOpen } =
    useContext(DataContext);
  const { data: session } = useSession();
  const getLink = useRef(null);
  return (
    <>
      <Transition.Root show={openMenu} as={Fragment}>
        <Dialog
          style={{ zIndex: '9000' }}
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={getLink}
          onClose={setOpenMenu}>
          <div className='flex relative   '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen '
              aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <div
                className={` absolute top-16 right-0 xl:hidden animate-popUp mr-5  bg-white rounded-lg  transform transition-all h-80 w-60 ${
                  !theme
                    ? 'lightTheme bg-white  shadow-xl '
                    : 'darkTheme bg-slate-800  shadow-slate-400'
                }`}>
                <div>
                  {session && (
                    <div className={` flex flex-col gap-2 p-3 my-2  `}>
                      <ThemeToggle className='mb-1' />
                      <MobileMenuButton
                        Icon={ViewListIcon}
                        onClick={() => setViewEveryonesPosts((prev) => !prev)}
                        viewEveryonesPosts={viewEveryonesPosts}
                      />
                      <MobileMenuButton Icon={ViewGridIcon} title='More' />
                      <MobileMenuButton Icon={ChatIcon} title='Messenger' />
                      <MobileMenuButton Icon={BellIcon} title='Notifications' />
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};