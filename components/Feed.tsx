import React from 'react';
import { Stories, InputBox, Posts, MobileInputboxx } from '.';
import { useSession } from 'next-auth/react';

export const Feed = () => {
  const { data: session } = useSession();

  return (
    <div className='flex-grow h-[85vh] sm:h-screen pb-5 sm:pt-6 sm:ml-2  sm:mr-4 overflow-y-auto scrollbar-hide sm:px-2'>
      <div className='mx-auto max-w-4xl'>
        <MobileInputboxx />
        <Stories />
        <InputBox />
        {session && <Posts />}
      </div>
    </div>
  );
};
