import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const PostCommentBoxInputbox = () => {
  const { theme } = useContext(ThemeContext);
  const {
    setModalOpen,
    setAddingNewComment,
    setUpdatePostViaModal,
    setNewPostBtnClicked,
  } = useContext(DataContext);
  const { data: session } = useSession();

  return (
    <div
      className={` text-gray-500 font-medium  ${
        !theme
          ? 'themeLight'
          : 'themeDark  bg-slate-800 shadow-slate-600 shadow-sm '
      }`}>
      <div className='flex  gap-4 pb-4 px-4 pt-2 items-center'>
        {session && (
          <Image
            className='rounded-full'
            src={session!.user!.image as string}
            width={40}
            height={40}
            layout='fixed'
            alt='user image'
          />
        )}
        <div
          onClick={() => {
            setAddingNewComment(true);
            setUpdatePostViaModal(false);
            setNewPostBtnClicked(false);
            setModalOpen(true);
          }}
          className={`rounded-full h-12 flex-grow px-5 ${
            !theme
              ? 'lightTheme bg-gray-100 '
              : 'darkTheme bg-slate-700 text-white'
          }`}>
          <p className='mt-3 text-sm'>
            {!session
              ? `Please sign in to make a post, click here.`
              : `Leaving a comment ${session?.user?.name
                  ?.split(' ')
                  ?.slice(0, 1)}?`}
          </p>
        </div>
      </div>
    </div>
  );
};
