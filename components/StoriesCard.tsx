import React, { useContext } from 'react';
import Image from 'next/image';
import { ThemeContext } from '../ThemeContext';
import { useSession } from 'next-auth/react';

import { PlusCircleIcon } from '@heroicons/react/outline';
interface Props {
  name: string;
  src: string;
  profile: string;
  active: boolean;
  hide: boolean;
}

export const StoriesCard = ({ name, src, profile, active, hide }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();

  return (
    <div
      className={` ${
        hide ? 'hidden 2xl:block' : ' '
      } relative h-40 sm:h-64 w-40 cursor-pointer overflow-x transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse rounded-b-xl  ${
        !theme
          ? 'border border-gray-100 shadow rounded-t-xl'
          : ' shadow-blue-900 shadow-sm hover:shadow-none'
      }`}>
      {!active && (
        <div className=' flex relative p-1  z-40 lg:rounded-full w-12 mt-2 ml-2  '>
          <Image
            className='absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10 '
            src={profile}
            width={40}
            height={40}
            layout='fixed'
            objectFit='cover'
          />
        </div>
      )}

      {!active && (
        <Image
          className='object-cover filter brightness-75 rounded-xl'
          src={src}
          layout='fill'
        />
      )}
      {active && session?.user && (
        <Image
          className=' object-contain object-top filter rounded-xl'
          src={session?.user?.image!}
          layout='fill'
        />
      )}
      {!active && (
        <p className='absolute opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate px-2'>
          {name}
        </p>
      )}
      {active && (
        <>
          <div
            className={`relative   mt-[3.4rem] sm:mt-[8.8rem] md:mt-[8.7rem] rounded-b-3xl py-2 opacity-100  text-blue-500 text-sm font-bold truncate ${
              !theme ? 'lightTheme bg-white' : 'darkTheme'
            }`}>
            <div className='flex flex-col items-center'>
              <PlusCircleIcon className='rounded-full  bg-blue-600  h-10 text-white' />
              <p className='text-white'>{name}</p>
              <p className='text-sm flex   text-gray-900  font-bold px-1 '>
                Create <span className='hidden md:block'>&nbsp;story</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
