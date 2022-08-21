import React from 'react';
import { SidebarTwoHeading } from './SidebarTwoHeading';
import Image from 'next/image';

export const SidebarTwoBirthdays = () => {
  return (
    <div>
      <SidebarTwoHeading title={'Birthdays'} />
      <div className='flex items-center gap-2 mt-4'>
        <Image
          src={'/images/bday.jpeg'}
          width={60}
          height={50}
          alt='logo'
          layout='fixed'
        />
        <p className='text-lg font-medium'>
          Ricardo Alanso and <span className='font-bold'>8 others </span>have
          their birthdays today.
        </p>
      </div>
      <hr className='mt-4 mx-4 mb-2 border border-gray-200' />
    </div>
  );
};
