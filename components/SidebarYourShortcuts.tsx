import React from 'react';
import { SidebarTwoHeading } from './SidebarTwoHeading';

export const SidebarYourShortcuts = () => {
  return (
    <div className='hidden lg:block'>
      <SidebarTwoHeading title={'Your Shortcuts'} />
      <hr className='mt-[0.1rem] mx-4 mb-2 border border-gray-200' />
    </div>
  );
};
