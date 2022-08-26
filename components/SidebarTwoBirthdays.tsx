import React from 'react';
import { SidebarTwoHeading } from './SidebarTwoHeading';
import Image from 'next/image';
import { Divider } from './Divider ';

export const SidebarTwoBirthdays = () => {
  return (
    <div>
      <SidebarTwoHeading title={'Birthdays'} />
      <div className='flex items-center gap-2 mt-4'>
        <Image
          src={'/images/FacebookIcons/bday.png'}
          width={60}
          height={50}
          alt='logo'
          layout='fixed'
        />
        <p className='text-lg font-medium'>
          <a
            href='https://twitter.com/BayoAkomolafe'
            rel='noopener'
            target='_blank'>
            Bayo Akomolafe
          </a>{' '}
          and <span className='font-bold'>8 others </span>have their birthdays
          today.
        </p>
      </div>
      <Divider custom={'mt-4 mx-4 mb-2'} />
    </div>
  );
};
