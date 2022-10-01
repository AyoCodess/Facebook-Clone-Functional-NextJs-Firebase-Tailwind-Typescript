import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const MobileInputboxx = () => {
  const { theme } = useContext(ThemeContext);
  const { setModalOpen } = useContext(DataContext);
  const { data: session } = useSession();

  return (
    <div
      className={`sm:hidden py-2 shadow-md text-gray-500 font-medium  ${
        !theme
          ? 'themeLight'
          : 'themeDark  bg-slate-800 shadow-slate-600 shadow-sm '
      }`}>
      <div className='flex  gap-4 p-4 items-center'>
        {session && (
          <Image
            className='rounded-full'
            src={session!.user!.image as string}
            width={40}
            height={40}
            layout='fixed'
            alt='user image'
          />
        )}
        <div
          onClick={() => {
            if (session) {
              setModalOpen(true);
            }
          }}
          className={`rounded-full h-12 flex-grow px-5 ${
            !theme
              ? 'lightTheme bg-gray-100 '
              : 'darkTheme bg-slate-700 text-white'
          }`}>
          <p className='mt-3 text-sm'>
            {!session
              ? `Please sign in to make a post.`
              : `Whats on your mind, ${session?.user?.name
                  ?.split(' ')
                  ?.slice(0, 1)}?`}
          </p>
        </div>
      </div>
      <hr
        className={`w-[100vw] ${
          !theme ? 'lightTheme  border-gray-300' : 'darkTheme border-blue-500'
        } `}
      />
    </div>
  );
};
