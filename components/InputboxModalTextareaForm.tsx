/* eslint-disable @next/next/no-img-element */
import React, { SetStateAction, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useSession } from 'next-auth/react';
import { DataContext } from '../DataContext';

interface Props {
  setSavedMessageRef: React.Dispatch<SetStateAction<string | null>>;
  textareaRef: React.LegacyRef<HTMLTextAreaElement>;
  photoToPost: string | ArrayBuffer | null | undefined;
  removePhotoToPost: () => void;
  onClick: () => void;
}

export const InputboxModalTextareaForm = ({
  setSavedMessageRef,
  textareaRef,
  photoToPost,
  removePhotoToPost,
  onClick,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const {
    updatePostViaModal,
    postMessageInModal,
    setPostMessageInModal,
    setForceUpdate,
  } = useContext(DataContext);
  const { data: session } = useSession();

  return (
    <form onClick={onClick} className='flex flex-col   '>
      <textarea
        onChange={(e) => {
          if (!updatePostViaModal) {
            setSavedMessageRef(e.target.value);
          } else {
            setPostMessageInModal(e.target.value);
          }
        }}
        disabled={!session}
        ref={textareaRef}
        className={`  flex-grow mt-4 px-2 focus:outline-none h-212 w-full break-words placeholder-inherit ${
          updatePostViaModal ? ' placeholder-gray-400' : ''
        } ${
          !theme ? 'lightTheme bg-white' : 'darkTheme bg-slate-800 text-white'
        }`}
        placeholder={
          !session
            ? `Please sign in to make a post, add photos and leave your mark!`
            : !updatePostViaModal
            ? `Whats on your mind, ${session?.user?.name
                ?.split(' ')
                ?.slice(0, 1)}`
            : `${postMessageInModal}... `
        }
        defaultValue={updatePostViaModal ? postMessageInModal : ''}
      />
      {photoToPost && (
        <div
          onClick={removePhotoToPost}
          className='flex flex-col filter mt-4 hover:brightness-110  hover:scale-105 transition duration-150 cursor-pointer '>
          <img
            src={photoToPost as string}
            className='object-contain max-h-60'
            alt='image post'
          />
          <p
            className={`text-xl  mt-6 text-center p-2  rounded-xl w-40 mx-auto ${
              !theme
                ? 'lightTheme text-blue-500 bg-gray-100'
                : 'darkTheme  text-white bg-blue-500'
            }`}>
            Remove Photo
          </p>
        </div>
      )}
      {/* <button hidden type='submit' onClick={sendPost}>
                            Submit
                          </button> */}{' '}
      {/*only works with input field */}
    </form>
  );
};
