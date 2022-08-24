import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { SearchIcon } from '@heroicons/react/solid';
import { ThemeContext } from '../ThemeContext';

export const Search = () => {
  const { data: session } = useSession();
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex ml-2 2xl:ml-5 items-center rounded-full  p-2 ${
        !theme ? 'lightTheme bg-gray-100' : 'darkTheme bg-white'
      } `}>
      <SearchIcon className='h-6 text-gray-600 ' />
      <input
        type='text'
        className={` hidden ${
          !session ? 'md:inline-flex' : '2xl:inline-flex'
        }  ml-2 bg-transparent outline-none  flex-shrink ${
          !theme ? 'themeLight placeholder-gray-500' : 'themeDark text-black'
        }`}
        placeholder='Search Metaspace'
      />
    </div>
  );
};
