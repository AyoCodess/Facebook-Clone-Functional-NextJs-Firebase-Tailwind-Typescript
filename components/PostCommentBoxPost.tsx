/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState, useRef } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import Image from 'next/image';
import { PostDropdownMenu, PostDropdownMenuComments } from '.';

interface Props {
  userComments: any[];
  updatedComments: any[];
  emailRef: string;
  postIdRef: string;
}

export const PostCommentBoxPost = ({
  userComments,
  updatedComments,
  emailRef,
  postIdRef,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const { setModalOpen, emailRefState, postIdRefState, commentForceUpdate } =
    useContext(DataContext);

  const [openDropdownMenuComments, setOpenDropdownMenuComments] =
    useState(false);

  return (
    <>
      {userComments &&
        !updatedComments &&
        userComments
          .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
          .map((comment) => {
            return (
              <div
                key={comment.id}
                className={`text-gray-500 font-medium  ${
                  !theme
                    ? 'themeLight'
                    : 'themeDark  bg-slate-800 shadow-slate-600 shadow-sm '
                }`}>
                <div className='flex  gap-4 pb-4 px-4 pt-2 items-center'>
                  <Image
                    className='rounded-full'
                    src={comment.image}
                    width={30}
                    height={30}
                    layout='fixed'
                    alt='user image'
                  />

                  <div
                    className={`rounded-md  flex-grow px-5 py-2 ${
                      !theme
                        ? 'lightTheme bg-gray-100 '
                        : 'darkTheme bg-slate-700 text-white'
                    }`}>
                    <div className='flex flex-col'>
                      <p className='text-sm font-bold'>{comment.name}</p>
                      <p className='mt-1 text-sm'>{comment.message}</p>

                      {comment.imageURL && (
                        <img
                          className='mt-2 rounded shadow  '
                          src={comment.imageURL}
                          alt='message image'
                        />
                      )}
                    </div>
                  </div>
                  <PostDropdownMenuComments
                    commentName={comment.name}
                    commentImage={comment.image}
                    commentImageURL={comment.imageURL}
                    commentEmail={comment.email}
                    userComments={userComments}
                    updatedComments={updatedComments}
                    postEmailRef={emailRef}
                    postIdRef={postIdRef}
                    commentMessage={comment.message}
                    commentTimestamp={comment.timestamp}
                    commentID={comment.id}
                    openDropdownMenuComments={openDropdownMenuComments}
                    setOpenDropdownMenuComments={setOpenDropdownMenuComments}
                  />
                </div>
              </div>
            );
          })}

      {updatedComments &&
        updatedComments
          .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
          .map((comment) => {
            return (
              <div
                key={comment.id}
                className={`text-gray-500 font-medium z-[1000]  ${
                  !theme
                    ? 'themeLight'
                    : 'themeDark  bg-slate-800 shadow-slate-600 shadow-sm '
                }`}>
                <div className='flex  gap-4 pb-4 px-4 pt-2 items-center'>
                  <Image
                    className='rounded-full'
                    src={comment.image}
                    width={30}
                    height={30}
                    layout='fixed'
                    alt='user image'
                  />

                  <div
                    className={`rounded-md  flex-grow px-5 py-2 ${
                      !theme
                        ? 'lightTheme bg-gray-100 '
                        : 'darkTheme bg-slate-700 text-white'
                    }`}>
                    <div className='flex flex-col'>
                      <p className='text-sm font-bold'>{comment.name}</p>
                      <p className='mt-1 text-sm'>{comment.message}</p>

                      {comment.imageURL && (
                        <img
                          className='mt-2 rounded shadow  '
                          src={comment.imageURL}
                          alt='message image'
                        />
                      )}
                    </div>
                  </div>
                  <PostDropdownMenuComments
                    commentName={comment.name}
                    commentImageURL={comment.imageURL}
                    commentImage={comment.image}
                    commentEmail={comment.email}
                    userComments={userComments}
                    updatedComments={updatedComments}
                    postEmailRef={emailRef}
                    postIdRef={postIdRef}
                    commentMessage={comment.message}
                    commentTimestamp={comment.timestamp}
                    commentID={comment.id}
                    openDropdownMenuComments={openDropdownMenuComments}
                    setOpenDropdownMenuComments={setOpenDropdownMenuComments}
                  />
                </div>
              </div>
            );
          })}
    </>
  );
};
