/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState, useRef, useEffect } from 'react';
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
import { PostButton, PostCommentBox, PostDropdownMenu } from '.';

import { db } from '../firebase';
interface Props {
  name: string;
  message: string;
  email: string;
  postImage: string;
  image?: string;
  timestamp: Timestamp;
  id: string;
  userComments: any[];
  updatedComments: any[];
  setUpdatedComments: React.Dispatch<React.SetStateAction<any[]>>;
  onClick?: () => void;
}

export const Post = ({
  name,
  message,
  postImage,
  image,
  timestamp,
  email,
  id,
  userComments,
  updatedComments,
  onClick,
}: Props) => {
  const { data: session } = useSession();
  const { theme } = useContext(ThemeContext);
  const {
    viewEveryonesPosts,
    setPostIdRefState,
    setOpenCommentBox,
    setEmailRefState,
    setCommentBoxClicked,
    setAddingNewComment,
    setNewPostBtnClicked,
    setUpdatePostViaModal,
    setUpdatingComment,
  } = useContext(DataContext);

  const postEmailRef = useRef(null);
  const postIdRef = useRef(null);
  const [selectedPostForComment, setSelectedPostForComment] = useState<
    null | boolean
  >(null);
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

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

  return (
    <div
      onClick={onClick}
      className={`flex flex-col  sm:rounded-lg mt-3 shadow-md ${
        !theme ? 'themeLight bg-white' : 'themeDark bg-slate-800'
      }`}>
      <div
        className={`p-5    sm:rounded-t-2xl shadow-sm ${
          !theme ? 'lightTheme' : 'darkTheme    '
        }`}>
        {/*post information */}

        <div className=' flex justify-between'>
          <div className='flex items-center gap-2  '>
            {' '}
            <img
              className='rounded-full'
              src={!viewEveryonesPosts ? session?.user?.image! : image}
              width={40}
              height={40}
              alt='user image'
            />
            <div>
              <p className='font-medium'>{name}</p>
              <p ref={postEmailRef} className=' hidden font-medium'>
                {email}
              </p>
              <p ref={postIdRef} className=' hidden font-medium'>
                {id}
              </p>
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
          <div className='relative'>
            <PostDropdownMenu
              postEmailRef={postEmailRef?.current?.innerText}
              postIdRef={postIdRef?.current?.innerText}
              openDropdownMenu={openDropdownMenu}
              setOpenDropdownMenu={setOpenDropdownMenu}
            />
          </div>
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
        className={`flex justify-between items-center sm:rounded-b-2xl  text-3xl shadow-md text-gray-400 border-t mt-2 ${
          !theme
            ? 'lightTheme'
            : 'darkTheme transition-shadow duration-75 border-t-slate-700 shadow-slate-800'
        }`}>
        <PostButton Icon={ThumbUpIcon} title='Like' disable={true} />
        <PostButton
          Icon={ChatAltIcon}
          title='Comment'
          onClick={() => {
            setSelectedPostForComment(postIdRef.current.innerText);
            // set for linking comments to posts
            setEmailRefState(postEmailRef.current.innerText);
            setOpenCommentBox(true);
            setAddingNewComment(true);
            setUpdatingComment(false);
            setNewPostBtnClicked(false);
            setCommentBoxClicked((prev) => !prev);
            setUpdatePostViaModal(false);
            setPostIdRefState(postIdRef.current.innerText);

            if (selectedPostForComment) {
              setSelectedPostForComment(null);
              setOpenCommentBox(false);
            }
          }}
        />
        <PostButton Icon={ShareIcon} title='Share' disable={true} />
      </div>
      {selectedPostForComment && (
        <PostCommentBox
          id={id}
          emailRef={postEmailRef.current.innerText}
          postIdRef={postIdRef.current.innerText}
          userComments={userComments}
          updatedComments={updatedComments}
        />
      )}
    </div>
  );
};
