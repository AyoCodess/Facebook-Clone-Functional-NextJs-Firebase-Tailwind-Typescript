import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { DataContext } from '../DataContext';
import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function InputboxModalHeaderUpdateComment({ setModalOpen }: Props) {
  const { data: session } = useSession();
  const {
    updatePostViaModal,
    postIdRefState,
    setForceUpdate,
    postMessageInModal,
    setUpdatePostViaModal,
    openCommentBox,
    userCommentObject,
    setCommentForceUpdate,
    emailRefState,
  } = useContext(DataContext);

  console.log(userCommentObject);

  return (
    <>
      <p className='text-sm'> Update Comment</p>
      <button
        disabled={!session}
        onClick={(e) => {
          const updatingUserComment = async () => {
            // logged in users post and comment
            if (emailRefState === session.user.email) {
              const ref = doc(
                db,
                'users',
                `${session.user.email}`,
                'posts',
                postIdRefState
              );

              try {
                await updateDoc(ref, {
                  comments: arrayRemove(userCommentObject),
                });

                await updateDoc(ref, {
                  comments: arrayUnion({
                    ...userCommentObject,
                    message: postMessageInModal,
                  }),
                });
              } catch (err) {
                console.log(err);
              } finally {
                setCommentForceUpdate((prev) => !prev);
              }
            }

            // not current logged in users post
            if (emailRefState !== session.user.email) {
              console.log('in');
              const ref = doc(
                db,
                'users',
                emailRefState,
                'posts',
                postIdRefState
              );

              try {
                await updateDoc(ref, {
                  comments: arrayRemove(userCommentObject),
                });

                await updateDoc(ref, {
                  comments: arrayUnion({
                    ...userCommentObject,
                    message: postMessageInModal,
                  }),
                });
              } catch (err) {
                console.log(err);
              } finally {
                setCommentForceUpdate((prev) => !prev);
              }
            }
          };

          updatingUserComment();
          setModalOpen(false);
        }}
        className='px-2 py-1 bg-blue-500 font-medium hover:bg-blue-400 text-white text-sm rounded-md'>
        Post
      </button>
    </>
  );
}
