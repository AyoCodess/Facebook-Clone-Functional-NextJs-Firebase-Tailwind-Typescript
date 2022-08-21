import React, { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../Context';
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { collection, addDoc, Timestamp, setDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

interface Props {
  setForceUpdate: (forceUpdate: boolean) => void;
}

export const InputBox = ({ setForceUpdate }: Props) => {
  const { theme, setShow, setTitle, setDescription } = useContext(ThemeContext);
  const { data: session } = useSession();

  const inputRef = useRef<HTMLInputElement>(null);
  const photoPickerRef = useRef<HTMLInputElement>(null);

  const [photoToPost, setPhotoToPost] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  const removePhotoToPost = () => {
    setPhotoToPost(null);
  };

  const addPhotoToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    // selecting and uploading a photo
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);

      if (e.target.files[0].type.includes('image')) {
        reader.onload = (readerEvent) => {
          setPhotoToPost(readerEvent?.target?.result); //base64 string
        };
      } else {
        setShow(true);
        setTitle('Please select an image');
        setDescription(`other file types are not supported`);
      }
    }
    photoPickerRef.current!.value = '';
  };

  const sendPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // if there is no comment to post, do nothing
    if (!inputRef.current!.value) {
      setShow(true);
      setTitle(`No empty thoughts allowed`);
      setDescription(
        `Please share whats on your mind ${session?.user?.name
          ?.split(' ')
          .slice(0, 1)}...`
      );
      return;
    }

    try {
      //   handles posts with no image attached
      if (!photoToPost) {
        console.log('post with NO photo');
        await addDoc(collection(db, 'posts'), {
          message: inputRef.current!.value,
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
          timestamp: Timestamp.now(),
        });
        inputRef.current!.value = '';
        setPhotoToPost(null);
      }
      //   handles posts with image attached
      if (photoToPost) {
        const photoRef = ref(storage, `posts/photo-${Date.now()}.png`);
        console.log('post with photo');
        // upload photo to firebase storage
        await uploadString(photoRef, photoToPost as string, 'data_url').catch(
          (err) => console.error('there was an error uploading the photo', err)
        );
        const downloadURL = await getDownloadURL(photoRef);
        // adding the image URL to the object to be posted to the collection
        await addDoc(collection(db, 'postsWithPhotos'), {
          message: inputRef?.current?.value,
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
          imageURL: downloadURL,
          timestamp: Timestamp.now(),
        });
        inputRef.current!.value = '';
        setPhotoToPost(null);
      }

      inputRef.current!.value = '';
      setPhotoToPost(null);
    } catch (error) {
      console.error('input box error', error);
      setShow(true);
      setTitle('Error');
      setDescription(`${error}`);
    } finally {
      console.log('running forced update');
      setForceUpdate((prev) => !prev);
    }
  };

  return (
    <div
      className={`p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6  ${
        !theme ? 'themeLight' : 'themeDark shadow-slate-600 shadow-sm '
      }`}>
      <div className='flex gap-4 p-4 items-center'>
        {session && (
          <Image
            className='rounded-full'
            src={session!.user!.image as string}
            width={40}
            height={40}
            layout='fixed'
          />
        )}
        <form className='flex flex-1'>
          <input
            disabled={!session}
            ref={inputRef}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            type='text'
            placeholder={
              !session
                ? `Please sign in to make a post`
                : `Whats on your mind, ${session?.user?.name
                    ?.split(' ')
                    ?.slice(0, 1)}?`
            }
          />
          <button hidden type='submit' onClick={sendPost}>
            Submit
          </button>
        </form>

        {photoToPost && (
          <div
            onClick={removePhotoToPost}
            className='flex flex-col filter hover:brightness-110  hover:scale-105 transition duration-150 cursor-pointer '>
            <img
              src={photoToPost as string}
              className='h-10 object-contain'
              alt='image post'
            />
            <p className='text-xs text-red-500 text-center'>Remove</p>
          </div>
        )}
      </div>
      <hr className='mt-[0.1rem] mx-4 mb-2 border border-gray-200' />
      <div className='flex justify-evenly'>
        <div
          className={`inputIcon ${!theme ? '' : 'hover:bg-blue-500 '} ${
            session ? ' ' : ' hover:bg-transparent cursor-default'
          }`}>
          <VideoCameraIcon className={`h-7 text-red-500  `} />
          <p
            className={`text-xs sm:text-sm xl:text-base ${
              !theme ? 'themeLight' : 'themeDark bg-transparent'
            }`}>
            Live Video
          </p>
        </div>

        <div
          onClick={() => {
            if (session) {
              photoPickerRef?.current?.click();
            }
          }}
          className={`inputIcon ${!theme ? '' : 'hover:bg-blue-500 '} ${
            session ? ' ' : ' hover:bg-transparent cursor-default'
          }`}>
          <CameraIcon className='h-7 text-green-400' />
          <p
            className={`text-xs sm:text-sm xl:text-base ${
              !theme ? 'themeLight' : 'themeDark bg-transparent'
            }`}>
            Photo/Video
          </p>
          <input
            type='file'
            ref={photoPickerRef}
            onChange={(e) => addPhotoToPost(e)}
            hidden
          />
        </div>

        <div
          className={`inputIcon ${!theme ? '' : 'hover:bg-blue-500 '} ${
            session ? ' ' : ' hover:bg-transparent cursor-default'
          }`}>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p
            className={`text-xs sm:text-sm xl:text-base  ${
              !theme ? 'themeLight' : 'themeDark bg-transparent'
            }`}>
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
};
