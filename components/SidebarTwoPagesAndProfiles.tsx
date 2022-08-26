import React, { useContext } from 'react';
import { Divider, SidebarTwoHeading } from '../components';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { ThemeContext } from '../ThemeContext';

export const SidebarTwoPagesAndProfiles = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className='flex items-center justify-between'>
        <SidebarTwoHeading title={'Your Pages and profiles'} custom={'mt-0'} />
        <DotsHorizontalIcon className='h-6 hover:text-gray-400 cursor-pointer' />
      </div>
      <Divider custom={'mt-4 mx-4 mb-2 '} />
    </div>
  );
};
