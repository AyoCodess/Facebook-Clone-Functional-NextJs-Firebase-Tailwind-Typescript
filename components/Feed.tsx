import React, { useState } from 'react';
import { Stories, InputBox, Posts } from '../components';
import { useSession } from 'next-auth/react';

export const Feed = () => {
  const { data: session } = useSession();
  const [forceUpdate, setForceUpdate] = useState<boolean>(false); // updates posts when new post is added
  return (
    <div className='flex-grow h-screen pb-44 pt-6 ml-2 mr-2 sm:mr-4 overflow-y-auto scrollbar-hide sm:px-2'>
      <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl '>
        <Stories />
        <InputBox setForceUpdate={setForceUpdate} />
        <Posts forceUpdate={forceUpdate} />
      </div>
    </div>
  );
};
