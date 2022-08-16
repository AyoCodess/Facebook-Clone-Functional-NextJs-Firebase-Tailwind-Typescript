import React, { useContext } from 'react';
import { ThemeContext } from '../Context';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const InputBox = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { data: session } = useSession();

  return (
    <div>
      <div>
        <Image
          className='rounded-full'
          src={session!.user!.image as string}
          width={40}
          height={40}
          layout='fixed'
        />
      </div>
    </div>
  );
};
