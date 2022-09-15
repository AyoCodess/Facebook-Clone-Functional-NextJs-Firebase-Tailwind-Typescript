import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { DataContext } from '../DataContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function InputboxModalHeaderUpdatePost({ setModalOpen }: Props) {
  const { data: session } = useSession();
  const {
    updatePostViaModal,
    postIdRefState,
    setForceUpdate,
    postMessageInModal,
    setUpdatePostViaModal,
  } = useContext(DataContext);
  return (
    <>
      <p className='text-sm'> Update Post</p>
      <button
        disabled={!session}
        onClick={(e) => {
          // updating a current post
          if (updatePostViaModal) {
            const updatingPost = async () => {
              const post = doc(
                db,
                'users',
                `${session.user.email}`,
                'posts',
                postIdRefState
              );

              console.log('state', postIdRefState);
              const postDoc = await getDoc(post);

              await updateDoc(post, {
                message: postMessageInModal,
              });

              console.log('updating...');
              setUpdatePostViaModal(false);
              setForceUpdate((prev) => !prev);
            };

            updatingPost();
            setModalOpen(false);
            setForceUpdate(true);
          }
        }}
        className='px-2 py-1 bg-blue-500 font-medium hover:bg-blue-400 text-white text-sm rounded-md'>
        Post
      </button>
    </>
  );
}
