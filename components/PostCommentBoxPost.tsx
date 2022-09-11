/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { query, collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
  userComments: any[];
  updatedComments: any[];

  setUpdatedComments: React.Dispatch<React.SetStateAction<any[]>>;
}

export const PostCommentBoxPost = ({
  userComments,
  updatedComments,

  setUpdatedComments,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const { setModalOpen, emailRefState, postIdRefState, commentForceUpdate } =
    useContext(DataContext);

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
                    onClick={() => setModalOpen(true)}
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
                    onClick={() => setModalOpen(true)}
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
                </div>
              </div>
            );
          })}
    </>
  );
};
