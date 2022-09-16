import { Fragment } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

import React, { useContext, useEffect } from 'react';
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
  openDropdownMenu: boolean;
  setOpenDropdownMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostDropdownMenu = ({
  postEmailRef,
  postIdRef,
  setOpenDropdownMenu,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const {
    setModalOpen,
    setPostMessageInModal,
    setForceUpdate,
    setPhotoToPost,
    setAddingNewComment,
    setNewPostBtnClicked,
    setUpdatePostViaModal,
    setUpdatingComment,
    setFirebaseImageURL,
    emailRefState,
    setEmailRefState,
  } = useContext(DataContext);
  const { data: session } = useSession();

  const updatePost = async () => {
    const post = doc(db, 'users', `${session.user.email}`, 'posts', postIdRef);
    const postDoc = await getDoc(post);
    setUpdatePostViaModal(true);
    setNewPostBtnClicked(false);
    setUpdatingComment(false);
    setPostMessageInModal(postDoc.data().message);
    setModalOpen(true);
    setFirebaseImageURL({
      id: postIdRef,
      imageURL: postDoc.data().imageURL,
    });

    console.log('postsdata', postDoc.data());
  };

  const deletePost = async () => {
    try {
      await deleteDoc(
        doc(db, 'users', `${session.user.email}`, 'posts', postIdRef)
      );
    } catch (error) {
      console.error('there was an error', error);
    } finally {
      setForceUpdate((prev) => !prev);
    }

    setPostMessageInModal('');
    setPhotoToPost(null);
  };

  // 3 dots for dropdown menu only displays if the post is the user's post
  useEffect(() => {
    setEmailRefState(postEmailRef);
  }, [postEmailRef]);

  return (
    <>
      {session.user.email === postEmailRef && (
        <div className=''>
          <Menu as='div' className='relative inline-block text-left z-10 '>
            <div>
              <Menu.Button>
                <DotsHorizontalIcon
                  onClick={() => setOpenDropdownMenu(true)}
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
                className={`absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                  !theme
                    ? 'lightTheme bg-white'
                    : 'darkTheme bg-slate-700 shadow shadow-black'
                }`}>
                <div className='px-1 py-1 '>
                  {session.user.email === postEmailRef && (
                    <Menu.Item>
                      <MobileMenuButton
                        title='Update Post'
                        Icon={UploadIcon}
                        onClick={() => {
                          updatePost();
                          setUpdatingComment(false);
                          setAddingNewComment(false);
                          setNewPostBtnClicked(false);
                          setUpdatePostViaModal(true);
                        }}
                      />
                    </Menu.Item>
                  )}
                  {session.user.email === postEmailRef && (
                    <Menu.Item>
                      <MobileMenuButton
                        title='Delete Post'
                        Icon={FolderRemoveIcon}
                        onClick={() => {
                          deletePost();
                        }}
                      />
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </>
  );
};
