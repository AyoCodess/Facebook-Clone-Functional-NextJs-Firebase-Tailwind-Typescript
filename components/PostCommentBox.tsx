import { ArrowDownIcon } from '@heroicons/react/solid';
import React from 'react';
import { LoadingSpinner, PostCommentBoxInputbox, PostCommentBoxPost } from '.';
import { DataContext } from '../DataContext';

interface Props {
  id: string;
  userComments: any[];
  updatedComments: any[];
  emailRef: string;
  postIdRef: string;
}
export const PostCommentBox = ({
  id,
  userComments,
  updatedComments,
  emailRef,
  postIdRef,
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
      {loadCommentBox && id === postIdRefState && <LoadingSpinner />}
      {!loadCommentBox && (
        <PostCommentBoxPost
          emailRef={emailRef}
          postIdRef={postIdRef}
          userComments={userComments}
          updatedComments={updatedComments}
        />
      )}
    </section>
  );
};
