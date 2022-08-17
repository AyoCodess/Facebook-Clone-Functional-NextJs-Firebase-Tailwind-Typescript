import React, { useContext, useRef } from 'react';
import { ThemeContext } from '../Context';
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const InputBox = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { data: session } = useSession();

  const inputRef = useRef<HTMLInputElement>(null);

  const sendPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!inputRef.current) return;

    try {
      const posts = await addDoc(collection(db, 'posts'), {
        message: inputRef.current.value,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        timestamp: Timestamp.now(),
      });
    } catch (err) {
      console.error(err);
    }

    inputRef.current.value = '';
  };
  return (
    <div
      className={` p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6 transition duration-700 ${
        !theme ? 'bg-white' : ' bg-gray-800'
      }`}>
      <div className='flex gap-4 p-4 items-center'>
        <Image
          className='rounded-full'
          src={session!.user!.image as string}
          width={40}
          height={40}
          layout='fixed'
        />
        <form className='flex flex-1'>
          <input
            ref={inputRef}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            type='text'
            placeholder={`Whats on your mind ${session?.user?.name}`}
          />
          <button hidden type='submit' onClick={sendPost}>
            Submit
          </button>
        </form>
      </div>
      <div className='flex justify-evenly'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p
            className={`text-xs sm:text-sm xl:text-base transition duration-700 ${
              !theme ? '' : 'text-white'
            }`}>
            Live Video
          </p>
        </div>

        <div className='inputIcon'>
          <CameraIcon className='h-7 text-green-400' />
          <p
            className={`text-xs sm:text-sm xl:text-base transition duration-700 ${
              !theme ? '' : 'text-white'
            }`}>
            Photo/Video
          </p>
          <input type='file' hidden />
        </div>

        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p
            className={`text-xs sm:text-sm xl:text-base transition duration-700 ${
              !theme ? '' : 'text-white'
            }`}>
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
};
