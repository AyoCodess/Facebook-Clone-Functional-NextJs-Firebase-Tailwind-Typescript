import React from 'react';
import { Stories, InputBox } from '../components';
import { useSession } from 'next-auth/react';

export const Feed = () => {
  const { data: session } = useSession();
  return (
    <div className='flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto'>
      {session && (
        <div className=''>
          <Stories />
          <InputBox />
          {/*posts */}
        </div>
      )}
    </div>
  );
};
