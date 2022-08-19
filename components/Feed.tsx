import React from 'react';
import { Stories, InputBox, Posts } from '../components';
import { useSession } from 'next-auth/react';

export const Feed = () => {
  const { data: session } = useSession();
  return (
    <div className='flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide px-2'>
      <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl '>
        <Stories />
        <InputBox />
        <Posts />
      </div>
    </div>
  );
};
