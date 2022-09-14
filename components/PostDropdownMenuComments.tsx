import { Fragment } from 'react';
import { XIcon } from '@heroicons/react/solid';
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

import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import { Menu } from '@headlessui/react';

import {
  DotsHorizontalIcon,
  FolderRemoveIcon,
  UploadIcon,
} from '@heroicons/react/solid';

import { useSession } from 'next-auth/react';
import { Transition } from '@headlessui/react';
import { MobileMenuButton } from './MobileMenuButton';

interface Props {
  postEmailRef: any;
  postIdRef: any;
  openDropdownMenuComments: boolean;
  setOpenDropdownMenuComments: React.Dispatch<React.SetStateAction<boolean>>;
  userComments: any[];
  updatedComments: any[];
  commentID: string;
  commentMessage: string;
  commentTimestamp: string;
  commentEmail: string;
  commentImage: string;
  commentName: string;
  commentImageURL: string;
}

export const PostDropdownMenuComments = ({
  postEmailRef,
  postIdRef,
  userComments,
  updatedComments,
  openDropdownMenuComments,
  commentID,
  commentMessage,
  commentTimestamp,
  commentEmail,
  commentImage,
  commentName,
  commentImageURL,
  setOpenDropdownMenuComments,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const {
    setModalOpen,
    setPostMessageInModal,
    setPostIdRefState,
    setForceUpdate,
    setAddingNewComment,
    setNewPostBtnClicked,
    setUpdatePostViaModal,
    setCommentForceUpdate,
    setUpdatingComment,
    setUserCommentObject,
    userCommentObject,
    postIdRefState,
  } = useContext(DataContext);
  const { data: session } = useSession();

  const updateComment = async () => {
    try {
      setUserCommentObject({
        email: `${session.user.email}`,
        id: commentID,
        image: `${session.user.image}`,
        message: commentMessage,
        name: `${session.user.name}`,
        timestamp: commentTimestamp,
        imageURL: commentImageURL,
      });

      setNewPostBtnClicked(false);
      setAddingNewComment(false);
      setUpdatingComment(true);
      setPostMessageInModal(commentMessage);
      setUpdatePostViaModal(true);

      setModalOpen(true);
    } catch (err) {
      console.log('UPDATE COMMENT ERROR', err);
    }
  };

  const deleteComment = async (commentObject: any) => {
    // original poster can delete there comments

    if (postEmailRef === session.user.email) {
      console.log('OWN POST');
      const ref = doc(db, 'users', `${session.user.email}`, 'posts', postIdRef);

      // if post has no image
      if (!commentObject?.imageURL) {
        console.log('NO IMAGE');
        try {
          await updateDoc(ref, {
            comments: arrayRemove(commentObject),
          });
        } catch (error) {
          console.error('there was an error', error);
        } finally {
          setCommentForceUpdate((prev) => !prev);
        }
      }

      // if post has an image
      if (commentObject?.imageURL) {
        console.log(' HAS A IMAGE');
        try {
          await updateDoc(ref, {
            comments: arrayRemove(commentObject),
          });
        } catch (error) {
          console.error('there was an error', error);
        } finally {
          setCommentForceUpdate((prev) => !prev);
        }
      }
    }
    // other users can delete their own comments
    if (postEmailRef !== session.user.email) {
      console.log('different user logged in');

      console.log(commentObject);

      const ref = doc(db, 'users', postEmailRef, 'posts', postIdRef);

      // if post has no image
      if (!commentObject?.imageURL) {
        console.log('NO IMAGE');
        try {
          await updateDoc(ref, {
            comments: arrayRemove(commentObject),
          });
        } catch (error) {
          console.error('there was an error', error);
        } finally {
          setCommentForceUpdate((prev) => !prev);
        }
      }

      // if post has an image
      if (commentObject?.imageURL) {
        console.log(' HAS A IMAGE');
        try {
          await updateDoc(ref, {
            comments: arrayRemove(commentObject),
          });
        } catch (error) {
          console.error('there was an error', error);
        } finally {
          setCommentForceUpdate((prev) => !prev);
        }
      }
    }

    setTimeout(() => {
      setCommentForceUpdate((prev) => !prev);
    }, 1000);
  };

  return (
    <div className='relative'>
      <Menu as='div' className='relative inline-block text-left  '>
        <div>
          <Menu.Button>
            <DotsHorizontalIcon
              onClick={() => setOpenDropdownMenuComments(true)}
              className={`p-2 h-10 rounded-full transition duration-200 cursor-pointer ${
                !theme
                  ? 'lightTheme hover:bg-gray-100 text-gray-600'
                  : 'darkTheme hover:bg-blue-500 '
              }`}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items
            className={`z-50 absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              !theme
                ? 'lightTheme bg-white'
                : 'darkTheme bg-slate-700 shadow shadow-black'
            }`}>
            <div className='px-1 py-1  '>
              {session.user.email === commentEmail && (
                <Menu.Item>
                  <MobileMenuButton
                    title='Update'
                    Icon={UploadIcon}
                    onClick={() => {
                      updateComment();
                      setAddingNewComment(false);
                      setNewPostBtnClicked(false);
                      setUpdatePostViaModal(true);
                    }}
                  />
                </Menu.Item>
              )}
              {session.user.email === commentEmail && (
                <Menu.Item>
                  <MobileMenuButton
                    title='Delete '
                    Icon={FolderRemoveIcon}
                    onClick={() => {
                      async function getObject() {
                        let commentObject;
                        try {
                          const ref = doc(
                            db,
                            'users',
                            postEmailRef,
                            'posts',
                            postIdRefState
                          );

                          const docSnap = await getDoc(ref);

                          if (docSnap.exists()) {
                            console.log(
                              'Document data:',
                              docSnap
                                .data()
                                .comments.find(
                                  (comment: any) => commentID === comment.id
                                )
                            );

                            commentObject = docSnap
                              .data()
                              .comments.find(
                                (comment: any) => commentID === comment.id
                              );

                            setUserCommentObject(commentObject);
                          } else {
                            // doc.data() will be undefined in this case
                            console.log('No such document!');
                          }
                        } catch (err) {
                          console.log('getting object', err);
                        } finally {
                          setCommentForceUpdate((prev) => !prev);
                          deleteComment(commentObject);
                        }
                      }
                      getObject();
                    }}
                  />
                </Menu.Item>
              )}
              {session.user.email !== commentEmail && (
                <Menu.Item>
                  <MobileMenuButton title='Cannot Edit' Icon={XIcon} />
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
