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

export function InputboxModalHeaderCreatePost({
  setModalOpen,
  preSendPost,
}: Props) {
  const { data: session } = useSession();
  const { updatePostViaModal } = useContext(DataContext);
  return (
    <>
      <p className='text-sm'>Create Post</p>
      <button
        disabled={!session}
        onClick={(e) => {
          // creating a brand new post
          if (!updatePostViaModal) {
            preSendPost(e);
            setModalOpen(false);
          }
        }}
        className='px-2 py-1 bg-blue-500 font-medium hover:bg-blue-400 text-white text-sm rounded-md'>
        Post
      </button>
    </>
  );
}
