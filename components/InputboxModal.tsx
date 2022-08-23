import { Dialog, Transition } from '@headlessui/react';
import {
  ColorSwatchIcon,
  InformationCircleIcon,
  LocationMarkerIcon,
  ScaleIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/solid';
import React, {
  useContext,
  useRef,
  useState,
  Fragment,
  useEffect,
} from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { collection, addDoc, Timestamp, setDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

export const InputboxModal = () => {
  const { setModalOpen, modalOpen, viewEveryonesPosts } =
    useContext(DataContext);

  const [savedMessageRef, setSavedMessageRef] = useState<string | null>(null);

  const { theme } = useContext(ThemeContext);
  const {
    setShow,
    setTitle,
    setDescription,
    setForceUpdate,
    loading,
    setLoading,
  } = useContext(DataContext);

  const { data: session } = useSession();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  const preSendPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if there is no comment to post, do nothing
    if (!textareaRef.current!.value) {
      setShow(true);
      setTitle(`No empty thoughts allowed`);
      setDescription(
        `Please share whats on your mind ${session?.user?.name
          ?.split(' ')
          .slice(0, 1)}...`
      );
      return;
    }
    sendPost();
  };

  const sendPost = async () => {
    try {
      setLoading(true);
      //   handles posts with no image attached
      if (!photoToPost) {
        console.log('post with NO photo');
        await addDoc(collection(db, 'posts'), {
          message: savedMessageRef,
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
          timestamp: Timestamp.now(),
        });
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
          message: savedMessageRef,
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
          imageURL: downloadURL,
          timestamp: Timestamp.now(),
        });

        setPhotoToPost(null);
        setSavedMessageRef(null);
      }
    } catch (error) {
      console.error('INPUT BOX ERROR', error);
      setShow(true);
      setTitle('Error');
      setDescription(`${error}`);
    } finally {
      setLoading(false);
      console.log('running forced update');
      setForceUpdate((prev) => !prev);
    }
  };

  const getLink = useRef(null);
  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        style={{ zIndex: '9000' }}
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={getLink}
        onClose={setModalOpen}>
        <div className='flex items-end justify-center md:min-h-screen min-h-[70vh] pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen '
            aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
            <div
              className={` w-96  justify-between inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:min-h-[20vh] sm:w-full ${
                !theme ? 'lightTheme bg-white' : 'darkTheme bg-transparent'
              }`}>
              <div>
                <div
                  className={` px-2 pt-2 pb-4 ${
                    !theme ? 'lightTheme' : 'darkTheme bg-slate-800 text-white'
                  }`}>
                  <div className=''>
                    <div className='text-center '>
                      <div
                        className={`flex justify-between items-center cursor-pointer `}>
                        {/*banner */}
                        <XIcon
                          className='h-6 hover:text-gray-500'
                          onClick={() => setModalOpen(false)}
                        />
                        <p className='text-sm'>Create post</p>
                        <button
                          onClick={(e) => {
                            preSendPost(e);
                            setModalOpen(false);
                          }}
                          className='px-2 py-1 bg-blue-500 font-medium hover:bg-blue-400 text-white text-sm rounded-md'>
                          Post
                        </button>
                      </div>
                      <hr className='border mt-2 w-[100vw] ml-[-2rem]' />

                      <div className='mt-2'>
                        {/*post information */}
                        <div className='flex items-center gap-2 ml-1 '>
                          <img
                            className='rounded-full'
                            src={session?.user?.image!}
                            width={40}
                            height={40}
                          />
                          <div>
                            <p className='font-medium'>{session?.user?.name}</p>
                            <div
                              className={` flex gap-1 text-xs  ${
                                !theme
                                  ? 'lightTheme text-gray-400'
                                  : 'darkTheme text-white'
                              }`}>
                              <p className='border p-[0.1rem] rounded-md'>
                                friends
                              </p>
                              <p className='border p-[0.1rem] rounded-md'>
                                album
                              </p>
                              <p className='border p-[0.1rem] rounded-md'>
                                off
                              </p>
                            </div>
                          </div>
                        </div>
                        <form className='flex flex-col  '>
                          <textarea
                            onChange={(e) => setSavedMessageRef(e.target.value)}
                            disabled={!session}
                            ref={textareaRef}
                            className={`  flex-grow mt-4 px-2 focus:outline-none h-212 w-full break-words placeholder-inherit ${
                              !theme
                                ? 'lightTheme'
                                : 'darkTheme bg-slate-800 text-white'
                            }`}
                            placeholder={
                              !session
                                ? `Please sign in to make a post`
                                : `Whats on your mind, ${session?.user?.name
                                    ?.split(' ')
                                    ?.slice(0, 1)}?`
                            }
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
                              <p className='text-xl text-red-500 mt-6 text-center p-2 bg-gray-100 rounded-xl'>
                                Remove Photo
                              </p>
                            </div>
                          )}
                          {/* <button hidden type='submit' onClick={sendPost}>
                            Submit
                          </button> */}{' '}
                          {/*only works with input field */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/*footer */}
                <div
                  className={`border-t-4 shadow-lg rounded-2xl flex flex-col items-start p-2 ${
                    !theme ? 'lightTheme' : 'darkTheme bg-slate-800'
                  }`}>
                  <hr className='mx-auto w-10 border-2' />

                  <div
                    onClick={() => {
                      if (session) {
                        photoPickerRef?.current?.click();
                      }
                    }}
                    className={`inputIcon ${
                      !theme
                        ? 'themeLight'
                        : 'themeDark bg-transparent hover:bg-blue-500 '
                    } ${session ? '' : 'hover:bg-transparent cursor-default'}`}>
                    <CameraIcon className='h-7 text-green-400' />
                    <p
                      className={`text-xs sm:text-sm xl:text-base  ${
                        !theme
                          ? 'themeLight bg-transparent'
                          : 'themeDark bg-transparent'
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
                    className={`inputIcon ${
                      !theme ? '' : 'hover:bg-blue-500 '
                    } ${
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
                    className={`inputIcon ${
                      !theme ? '' : 'hover:bg-blue-500 '
                    } ${
                      session ? ' ' : ' hover:bg-transparent cursor-default'
                    }`}>
                    <UserIcon className='h-7 text-blue-600' />
                    <p
                      className={`text-xs sm:text-sm xl:text-base  ${
                        !theme ? 'themeLight' : 'themeDark bg-transparent'
                      }`}>
                      Tag People
                    </p>
                  </div>

                  <div
                    className={`inputIcon ${
                      !theme ? '' : 'hover:bg-blue-500 '
                    } ${
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
                  <div
                    className={`inputIcon ${
                      !theme ? '' : 'hover:bg-blue-500 '
                    } ${
                      session ? ' ' : ' hover:bg-transparent cursor-default'
                    }`}>
                    <LocationMarkerIcon className='h-7 text-orange-600' />
                    <p
                      className={`text-xs sm:text-sm xl:text-base  ${
                        !theme ? 'themeLight' : 'themeDark bg-transparent'
                      }`}>
                      Check In
                    </p>
                  </div>

                  <div
                    className={`inputIcon ${
                      !theme ? '' : 'hover:bg-blue-500 '
                    } ${
                      session ? ' ' : ' hover:bg-transparent cursor-default'
                    }`}>
                    <ColorSwatchIcon className='h-7 text-teal-400' />
                    <p
                      className={`text-xs sm:text-sm xl:text-base  ${
                        !theme ? 'themeLight' : 'themeDark bg-transparent'
                      }`}>
                      Background Color
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
