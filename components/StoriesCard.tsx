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
      } relative h-40 md:h-56 w-32 cursor-pointer overflow-x transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse rounded-b-3xl  ${
        !theme
          ? 'border border-gray-100 shadow rounded-t-3xl'
          : ' shadow-blue-900 shadow-sm hover:shadow-none'
      }`}>
      {!active && (
        <div className=' flex relative p-1 lg:bg-blue-500 z-40 lg:rounded-full w-12 mt-2 ml-2  '>
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
        <p className='absolute opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate px-2'>
          {name}
        </p>
      )}
      {active && (
        <>
          <div className='fixed  mt-[5rem] md:mt-[9rem] ml-3 xxxs:ml-3 xxs:ml-4 xs:ml-8 px-1 lg:bg-blue-500 z-40 rounded-full'>
            <Image
              className='  relative xs:mt-10 opacity-100 rounded-lg z-50'
              src={profile}
              width={40}
              height={40}
              layout='fixed'
              objectFit='cover'
            />
          </div>
          <div className='relative  bg-white mt-[6.6rem] md:mt-[10.5rem] rounded-b-3xl py-2 opacity-100  text-blue-500 text-sm font-bold truncate'>
            <div className='flex flex-col  items-center'>
              <p className='text-white'>{name}</p>
              <p className=' flex text-xs md:text-sm text-gray-400   font-normal '>
                Create <span className='hidden md:block'>&nbsp;story</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
