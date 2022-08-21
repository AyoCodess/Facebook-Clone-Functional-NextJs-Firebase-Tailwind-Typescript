import React, { useContext } from 'react';
import { SidebarTwoHeading } from '../components';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { ThemeContext } from '../ThemeContext';

export const SidebarTwoPagesAndProfiles = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className='flex items-center justify-between'>
        <SidebarTwoHeading title={'Your Pages and profiles'} custom={'mt-0'} />
        <DotsHorizontalIcon
          className={` h-8 w-8 md:h-10 md:w-10 cursor-pointer hover:bg-gray-300  ${
            !theme
              ? 'themeLight rounded-full p-2 bg-gray-200 text-black'
              : 'themeDark bg-transparent'
          }`}
        />
      </div>
      <hr className='mt-4 mx-4 mb-2 border border-gray-200' />
    </div>
  );
};
