import React, { useContext } from 'react';
import Image from 'next/image';
import { ThemeContext } from '../Context';
interface Props {
  name: string;
  src: string;
  profile: string;
  active: boolean;
  hide: boolean;
}

export const StoriesCard = ({ name, src, profile, active, hide }: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className={` ${
        hide ? 'hidden lg:block' : ' '
      } relative h-40 md:h-56 w-32 cursor-pointer overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse rounded-b-3xl  ${
        !theme
          ? 'border border-gray-100 shadow'
          : ' shadow-blue-900 shadow-sm hover:shadow-none'
      }`}>
      {!active && (
        <div className=' flex relative p-1 lg:bg-blue-500 z-40 lg:rounded-full w-12  '>
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

      <Image
        className='object-cover filter brightness-75 rounded-3xl'
        src={src}
        layout='fill'
      />
      {!active && (
        <p className='absolute opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate'>
          {name}
        </p>
      )}
      {active && (
        <>
          <div className=' flex top-[4rem]  left-1  md:top-[8rem] sm:left-3 md:left-5 relative p-1 lg:bg-blue-500 z-40 rounded-full w-12  '>
            <Image
              className='absolute  opacity-100 rounded-lg z-50'
              src={profile}
              width={40}
              height={40}
              layout='fixed'
              objectFit='cover'
            />
          </div>
          <div className='absolute left-0 bottom-0 bg-white rounded-b-3xl py-2 px-4 opacity-100   text-blue-500 text-sm font-bold truncate'>
            <div className='flex flex-col  items-center'>
              <p className='text-white'>{name}</p>
              <p className=' flex text-xs md:text-sm text-gray-400 '>
                Create <span className='hidden sm:block'>&nbsp;story</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
