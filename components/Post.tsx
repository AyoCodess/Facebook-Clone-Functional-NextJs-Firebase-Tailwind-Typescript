import React, { useContext } from 'react';
import {
  ChatAltIcon,
  DotsHorizontalIcon,
  ShareIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import { useSession } from 'next-auth/react';
import { PostButton } from '.';

interface Props {
  name: string;
  message: string;
  email: string;
  postImage: string;
  image?: string;
  timestamp: Timestamp;
}

export const Post = ({ name, message, postImage, image, timestamp }: Props) => {
  const { data: session } = useSession();
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

  const date_time = `${date} ${time}`;

  const { theme } = useContext(ThemeContext);
  const { viewEveryonesPosts } = useContext(DataContext);

  return (
    <div
      className={`flex flex-col  sm:rounded-lg mt-3 shadow-md ${
        !theme ? 'themeLight bg-white' : 'themeDark bg-slate-800'
      }`}>
      <div
        className={`p-5    sm:rounded-t-2xl shadow-sm ${
          !theme ? 'lightTheme' : 'darkTheme  shadow-blue-900   '
        }`}>
        {/*post information */}

        <div className='flex justify-between'>
          <div className='flex items-center gap-2  '>
            {' '}
            <img
              className='rounded-full'
              src={!viewEveryonesPosts ? session?.user?.image! : image}
              width={40}
              height={40}
            />
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
                <p className='text-xs text-gray-400'>Loading...</p>
              )}
            </div>
          </div>
          <DotsHorizontalIcon className='p-2 h-10 hover:bg-gray-100 text-gray-600 hover:rounded-full' />
        </div>

        {/*post message */}
        <p className='pt-4 mb-2'>{message}</p>
      </div>
      {/*image section */}
      {postImage && (
        <div
          className={`relative h-56 md:h-96 ${
            !theme ? 'themeLight bg-white ' : 'themeDark bg-slate-800'
          }`}>
          <Image
            src={postImage}
            objectFit='contain'
            layout='fill'
            alt={`${name}'s post image on leave your mark website, by ayo adesanya`}
          />
        </div>
      )}

      {/* Post Footer */}
      <div
        className={`flex justify-between items-center sm:rounded-b-2xl  shadow-md text-gray-400 border-t mt-2 ${
          !theme
            ? 'lightTheme'
            : 'darkTheme transition-shadow duration-75 border-t-slate-700 shadow-slate-800'
        }`}>
        <PostButton Icon={ThumbUpIcon} title='Like' />
        <PostButton Icon={ChatAltIcon} title='Comment' />
        <PostButton Icon={ShareIcon} title='Share' />
      </div>
    </div>
  );
};
