import React from 'react';
import { Stories, InputBox, Posts, MobileInputboxx, SignInOutButton } from '.';
import { useSession } from 'next-auth/react';

export const Feed = () => {
  const { data: session } = useSession();

  return (
    <div className='  flex-grow h-[90rem] pb-5 sm:pt-6 sm:ml-2  sm:mr-4 overflow-y-auto scrollbar-hide sm:px-2'>
      <div className='mx-auto max-w-4xl'>
        {session && <Stories />}
        <InputBox />
        <MobileInputboxx />
        {!session && (
          <div className='w-[20rem] h-[30rem] grid place-items-center text-center mx-auto'>
            <div>
              <p className='my-4'>Please sign in to view the rest of the app</p>
              <div className='mr-[2rem]'>
                <SignInOutButton login='signin' />
              </div>
            </div>
          </div>
        )}
        {session && <Posts />}
      </div>
    </div>
  );
};
