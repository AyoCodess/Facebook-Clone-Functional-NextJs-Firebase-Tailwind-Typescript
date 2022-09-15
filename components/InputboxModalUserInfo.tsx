/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useSession } from 'next-auth/react';

export const InputboxModalUserInfo = () => {
  const { data: session } = useSession();
  const { theme } = useContext(ThemeContext);

  return (
    <div className='flex items-center gap-2 ml-1 '>
      <img
        className='rounded-ful '
        src={
          session?.user?.image! ? session?.user?.image! : '/images/noWords.png'
        }
        width={40}
        height={40}
        alt='user image'
      />
      <div>
        <p className='font-medium'>{session?.user?.name}</p>
        <div
          className={` flex gap-1 text-xs  ${
            !theme ? 'lightTheme text-gray-400' : 'darkTheme text-white'
          }`}>
          <p className='border p-[0.1rem] rounded-md'>friends</p>
          <p className='border p-[0.1rem] rounded-md'>album</p>
          <p className='border p-[0.1rem] rounded-md'>off</p>
        </div>
      </div>
    </div>
  );
};
