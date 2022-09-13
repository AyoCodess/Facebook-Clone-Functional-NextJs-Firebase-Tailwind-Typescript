import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { DataContext } from '../DataContext';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preSendPost: (
    e: React.MouseEvent<HTMLButtonElement>,
    comment?: boolean
  ) => Promise<void>;
}

export function InputboxModalHeaderAddComment({
  setModalOpen,
  preSendPost,
}: Props) {
  const { data: session } = useSession();
  const { setCommentForceUpdate } = useContext(DataContext);

  return (
    <>
      <p className='text-sm'>Add Comment</p>
      <button
        disabled={!session}
        onClick={(e) => {
          // adding a comment to an existing post
          preSendPost(e, true);
          setModalOpen(false);
          setCommentForceUpdate((prev) => !prev);
        }}
        className='px-2 py-1 bg-blue-500 font-medium hover:bg-blue-400 text-white text-sm rounded-md'>
        Post
      </button>
    </>
  );
}
