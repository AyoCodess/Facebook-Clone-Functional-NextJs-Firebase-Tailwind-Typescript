import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { DataContext } from '../DataContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preSendPost: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const InputboxModalHeader = ({
  Icon,
  setModalOpen,
  preSendPost,
}: Props) => {
  const { data: session } = useSession();
  const {
    updatePostViaModal,
    postIdRefState,
    setForceUpdate,
    postMessageInModal,
  } = useContext(DataContext);
  return (
    <div className={`flex justify-between items-center cursor-pointer `}>
      {/*banner */}
      <Icon
        className='h-6 hover:text-gray-500'
        onClick={() => setModalOpen(false)}
      />
      <p className='text-sm'>Create post</p>
      <button
        disabled={!session}
        onClick={(e) => {
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
              setForceUpdate(true);
            };

            updatingPost();
            setModalOpen(false);
            setForceUpdate(false);
          } else {
            preSendPost(e);
            setModalOpen(false);
          }
        }}
        className='px-2 py-1 bg-blue-500 font-medium hover:bg-blue-400 text-white text-sm rounded-md'>
        Post
      </button>
    </div>
  );
};
