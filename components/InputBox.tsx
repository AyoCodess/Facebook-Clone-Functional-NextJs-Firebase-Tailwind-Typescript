import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { Divider } from './Divider ';
import { InputboxModalButton } from './InputboxModalButton';

export const InputBox = () => {
  const { theme } = useContext(ThemeContext);
  const { setModalOpen } = useContext(DataContext);
  const { data: session } = useSession();

  return (
    <div
      className={` hidden sm:block p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6  ${
        !theme
          ? 'themeLight'
          : 'themeDark  bg-slate-800 shadow-slate-600 shadow-sm '
      }`}>
      <div className='flex gap-4 p-4 items-center'>
        {session && (
          <Image
            className='rounded-full'
            src={session!.user!.image as string}
            width={40}
            height={40}
            layout='fixed'
            alt='user image'
          />
        )}
        <div
          onClick={() => setModalOpen(true)}
          className='rounded-full h-12 bg-gray-100 flex-grow px-5'>
          <p className='mt-3'>
            {!session
              ? `Please sign in to make a post, click here.`
              : `Whats on your mind, ${session?.user?.name
                  ?.split(' ')
                  ?.slice(0, 1)}?`}
          </p>
        </div>
      </div>
      <Divider />
      <div className='flex justify-evenly'>
        <InputboxModalButton
          Icon={VideoCameraIcon}
          iconColor='text-red-500'
          title='Live Video'
          onClick={() => setModalOpen(true)}
        />

        <InputboxModalButton
          Icon={CameraIcon}
          iconColor='text-green-400'
          title='Photo/Video'
          onClick={() => setModalOpen(true)}
        />

        <InputboxModalButton
          Icon={EmojiHappyIcon}
          iconColor='text-yellow-300'
          title='Feeling/Activity'
          onClick={() => setModalOpen(true)}
        />
      </div>
    </div>
  );
};
