import { ArrowDownIcon } from '@heroicons/react/solid';
import { query, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { LoadingSpinner, PostCommentBoxInputbox, PostCommentBoxPost } from '.';
import { DataContext } from '../DataContext';
import { db } from '../firebase';

interface Props {
  id: string;
  userComments: any[];
  setUpdatedComments: React.Dispatch<React.SetStateAction<any[]>>;
  updatedComments: any[];
}
export const PostCommentBox = ({
  id,
  userComments,
  setUpdatedComments,
  updatedComments,
}: Props) => {
  const { loadCommentBox, emailRefState, postIdRefState, commentForceUpdate } =
    React.useContext(DataContext);

  return (
    <section className='pt-2 '>
      <div className='flex gap-2 items-center'>
        <p className='ml-auto  text-gray-500 font-medium'>Most Recent</p>
        <ArrowDownIcon className='h-3 font-black pr-5' />
      </div>
      <PostCommentBoxInputbox />
      {loadCommentBox && <LoadingSpinner />}
      {!loadCommentBox && (
        <PostCommentBoxPost
          userComments={userComments}
          updatedComments={updatedComments}
          id={id}
        />
      )}
    </section>
  );
};
