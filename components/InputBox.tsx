import React, { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { collection, addDoc, Timestamp, setDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import { Divider } from './Divider ';

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
          />
        )}
        <div
          onClick={() => setModalOpen(true)}
          className='rounded-full h-12 bg-gray-100 flex-grow px-5'>
          <p className='mt-3'>
            {!session
              ? `Please sign in to make a post`
              : `Whats on your mind, ${session?.user?.name
                  ?.split(' ')
                  ?.slice(0, 1)}?`}
          </p>
        </div>
      </div>
      <Divider />
      <div className='flex justify-evenly'>
        <div
          onClick={() => setModalOpen(true)}
          className={`inputIcon ${!theme ? '' : 'hover:bg-blue-500 '} ${
            session ? ' ' : ' hover:bg-transparent cursor-default'
          }`}>
          <VideoCameraIcon className={`h-7 text-red-500  `} />
          <p
            className={`text-xs sm:text-sm xl:text-base ${
              !theme ? 'themeLight' : 'themeDark bg-transparent'
            }`}>
            Live Video
          </p>
        </div>

        <div
          onClick={() => setModalOpen(true)}
          className={`inputIcon ${!theme ? '' : 'hover:bg-blue-500 '} ${
            session ? ' ' : ' hover:bg-transparent cursor-default'
          }`}>
          <CameraIcon className='h-7 text-green-400' />
          <p
            className={`text-xs sm:text-sm xl:text-base ${
              !theme ? 'themeLight' : 'themeDark bg-transparent'
            }`}>
            Photo/Video
          </p>
        </div>

        <div
          onClick={() => setModalOpen(true)}
          className={`inputIcon ${!theme ? '' : 'hover:bg-blue-500 '} ${
            session ? ' ' : ' hover:bg-transparent cursor-default'
          }`}>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p
            className={`text-xs sm:text-sm xl:text-base  ${
              !theme ? 'themeLight' : 'themeDark bg-transparent'
            }`}>
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
};
