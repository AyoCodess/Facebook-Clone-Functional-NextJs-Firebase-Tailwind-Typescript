import { Fragment } from 'react';
import { XIcon } from '@heroicons/react/solid';
import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  arrayRemove,
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
  } = useContext(DataContext);
  const { data: session } = useSession();

  const updateComment = async () => {
    console.log(postIdRef);
    setPostIdRefState(postIdRef);
    const post = doc(db, 'users', `${session.user.email}`, 'posts', postIdRef);
    const postDoc = await getDoc(post);
    setUpdatePostViaModal(true);
    setNewPostBtnClicked(false);
    setPostMessageInModal(postDoc.data().message);
    setModalOpen(true);
  };
  const deleteComment = async () => {
    console.log(userComments);
    console.log('id ref', postIdRef);

    // original poster can delete there comments
    if (postEmailRef === session.user.email) {
      const ref = doc(db, 'users', `${session.user.email}`, 'posts', postIdRef);

      console.log('comment id', commentID);
      try {
        await updateDoc(ref, {
          comments: arrayRemove({
            email: `${session.user.email}`,
            id: commentID,
            image: `${session.user.image}`,
            message: commentMessage,
            name: `${session.user.name}`,
            timestamp: commentTimestamp,
          }),
        });
      } catch (error) {
        console.error('there was an error', error);
      } finally {
        setCommentForceUpdate((prev) => !prev);
      }
    }
    // other users can delete their own comments
    if (postEmailRef !== session.user.email) {
      console.log('different user logged in');

      const ref = doc(db, 'users', postEmailRef, 'posts', postIdRef);

      console.log('comment id', commentID);
      try {
        await updateDoc(ref, {
          comments: arrayRemove({
            email: commentEmail,
            id: commentID,
            image: commentImage,
            message: commentMessage,
            name: commentName,
            timestamp: commentTimestamp,
          }),
        });
      } catch (error) {
        console.error('there was an error', error);
      } finally {
        setCommentForceUpdate((prev) => !prev);
      }
    }
  };
  console.log('selected comment', {
    email: `${session.user.email}`,
    id: commentID,
    image: `${session.user.image}`,
    message: commentMessage,
    name: `${session.user.name}`,
    timestamp: commentTimestamp,
  });
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
                      deleteComment();
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
