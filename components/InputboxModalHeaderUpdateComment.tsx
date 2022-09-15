import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { DataContext } from '../DataContext';
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function InputboxModalHeaderUpdateComment({ setModalOpen }: Props) {
  const { data: session } = useSession();
  const {
    postIdRefState,
    postMessageInModal,
    userCommentObject,
    setCommentForceUpdate,
    emailRefState,
    firebaseImageURL,
  } = useContext(DataContext);

  return (
    <>
      <p className='text-sm'> Update Comment</p>
      <button
        disabled={!session}
        onClick={(e) => {
          // triggered from PostDropdownMenuComments.tsx (checkObject function)
          async function updateComment() {
            try {
              if (emailRefState === session.user.email) {
                console.log('OWN POST');
                const ref = doc(
                  db,
                  'users',
                  `${session.user.email}`,
                  'posts',
                  postIdRefState
                );

                // if post has no image
                if (!userCommentObject?.imageURL) {
                  //   console.log('NO IMAGE');

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
                  } catch (error) {
                    console.error('there was an error', error);
                  } finally {
                    setCommentForceUpdate((prev) => !prev);
                  }
                }

                //if post has an image
                if (userCommentObject?.imageURL) {
                  //   console.log(' HAS A IMAGE');
                  try {
                    await updateDoc(ref, {
                      comments: arrayRemove(userCommentObject),
                    });
                    await updateDoc(ref, {
                      comments: arrayUnion({
                        ...userCommentObject,
                        message: postMessageInModal,
                        imageURL: firebaseImageURL.imageURL,
                      }),
                    });
                  } catch (error) {
                    console.error('there was an error', error);
                  } finally {
                    setCommentForceUpdate((prev) => !prev);
                  }
                }
              }

              // other users can delete their own comments
              // triggered from PostDropdownMenuComments.tsx (checkObject function)
              if (emailRefState !== session.user.email) {
                console.log('different user logged in');

                console.log(userCommentObject);

                const ref = doc(
                  db,
                  'users',
                  emailRefState,
                  'posts',
                  postIdRefState
                );

                // if post has no image
                if (!userCommentObject?.imageURL) {
                  //   console.log('NO IMAGE');
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
                  } catch (error) {
                    console.error('there was an error', error);
                  } finally {
                    setCommentForceUpdate((prev) => !prev);
                  }
                }
              }

              // if post has an image
              if (userCommentObject?.imageURL) {
                console.log(' HAS A IMAGE');
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
                      imageURL: firebaseImageURL.imageURL,
                    }),
                  });
                } catch (error) {
                  console.error('there was an error', error);
                } finally {
                  setCommentForceUpdate((prev) => !prev);
                }
              }

              setTimeout(() => {
                setCommentForceUpdate((prev) => !prev);
              }, 1000);

              setModalOpen(false);
            } catch (err) {
              console.error('UPDATE COMMENT ERROR', err);
            }
          }
          updateComment();
          setModalOpen(false);
        }}
        className='px-2 py-1 bg-blue-500 font-medium hover:bg-blue-400 text-white text-sm rounded-md'>
        Post
      </button>
    </>
  );
}
