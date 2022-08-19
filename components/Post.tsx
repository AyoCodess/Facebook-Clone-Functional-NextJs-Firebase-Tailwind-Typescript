import React, { useContext } from 'react';
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { ThemeContext } from '../Context';

interface Props {
  name: string;
  message: string;
  email: string;
  postImage: string;
  image: string;
  timestamp: Timestamp;
}

export const Post = ({ name, message, postImage, image, timestamp }: Props) => {
  const dateTimestamp = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  ).toDate();

  const date = new Date(dateTimestamp)
    .toString()
    .split(' ')
    .slice(0, 3)
    .join(' ');

  const time = new Date(dateTimestamp)
    .toString()
    .split(' ')
    .slice(4, 5)
    .toString()
    .split(':')
    .slice(0, 2)
    .join(':');

  console.log(time);

  const date_time = `${date} ${time}`;

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col `}>
      <div
        className={`p-5  mt-5 rounded-t-2xl shadow-sm ${
          !theme ? 'lightTheme' : 'darkTheme shadow-blue-900   '
        }`}>
        <div className='flex items-center space-x-2'>
          <img className='rounded-full' src={image} width={40} height={40} />
          <div>
            <p className='font-medium'>{name}</p>
            {timestamp ? (
              <p
                className={`text-xs  ${
                  !theme ? 'lightTheme text-gray-400' : 'darkTheme text-white'
                }`}>
                {date_time}
              </p>
            ) : (
              <p className='text-xs text-gray-400'>Loading</p>
            )}
          </div>
        </div>

        <p className='pt-4'>{message}</p>
      </div>
      {postImage && (
        <div className='relative h-56 md:h-96 bg-white'>
          <Image src={postImage} objectFit='cover' layout='fill' />
          {/* <img src={postImage} alt='image' /> */}
        </div>
      )}

      {/* Post Footer */}
      <div
        className={`flex justify-between items-center rounded-b-2xl  shadow-md text-gray-400 border-t ${
          !theme
            ? 'lightTheme'
            : 'darkTheme transition-shadow duration-75 border-slate-800 shadow-slate-800'
        }`}>
        <div
          className={`inputIcon p-3 rounded-none rounded-bl-2xl group ${
            !theme ? 'lightTheme' : 'darkTheme hover:bg-blue-500 text-white'
          }`}>
          <ThumbUpIcon
            className={`h-4 text-blue-500  ${
              !theme ? 'lightTheme  ' : ' darkTheme group-hover:text-white'
            }`}
          />
          <p className='text-xs sm:text-base'>Like</p>
        </div>

        <div
          className={`inputIcon p-3 rounded-none group  ${
            !theme ? 'lightTheme' : 'darkTheme hover:bg-blue-500 text-white'
          }`}>
          <ChatAltIcon
            className={`h-4 text-blue-500 ${
              !theme ? 'lightTheme  ' : ' darkTheme group-hover:text-white'
            }`}
          />
          <p className={`text-xs sm:text-base `}>Comment</p>
        </div>

        <div
          className={`inputIcon p-3 rounded-none rounded-br-2xl group ${
            !theme ? 'lightTheme' : 'darkTheme hover:bg-blue-500 text-white'
          }`}>
          <ShareIcon
            className={`h-4 text-blue-500 ${
              !theme ? 'lightTheme  ' : ' darkTheme group-hover:text-white'
            }`}
          />
          <p className='text-xs sm:text-base'>Share</p>
        </div>
      </div>
    </div>
  );
};
