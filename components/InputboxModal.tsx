import { Dialog, Transition } from '@headlessui/react';
import cryptoRandomString from 'crypto-random-string';
import {
  ColorSwatchIcon,
  LocationMarkerIcon,
  UserIcon,
  VideoCameraIcon,
  XIcon,
} from '@heroicons/react/solid';
import React, { useContext, useRef, useState, Fragment } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import {
  InputboxModalButton,
  InputboxModalHeader,
  InputboxModalTextareaForm,
  InputboxModalUserInfo,
} from '.';

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
    postMessageInModal,
    updatePostViaModal,
    setUpdatePostViaModal,
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
    // initializes users the firebase collection

    let postID = cryptoRandomString({ length: 24 });

    const usersRef = doc(db, 'users', `${session?.user?.email}`);

    console.log('postid', postID);

    try {
      setLoading(true);
      //   handles posts with no image attached
      if (!photoToPost) {
        await setDoc(
          doc(db, 'users', `${session?.user?.email}`, 'posts', postID),
          {
            id: postID,
            message: savedMessageRef,
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image || 'https://i.imgur.com/MsZzedb.jpg',
            timestamp: Timestamp.now(),
          }
        );

        // setPostID(null);
        setPhotoToPost(null);
      }
      //   handles posts with image attached
      if (photoToPost) {
        const photoRef = ref(
          storage,
          `${session.user.email}/photo-${Date.now().valueOf()}.png`
        );
        console.log('post with photo');

        // upload photo to firebase storage
        await uploadString(photoRef, photoToPost as string, 'data_url').catch(
          (err) => console.error('there was an error uploading the photo', err)
        );

        const downloadURL = await getDownloadURL(photoRef);

        // adding the image URL to the object to be posted to the collection
        const postRef = collection(usersRef, 'posts');
        await setDoc(
          doc(db, 'users', `${session?.user?.email}`, 'posts', postID),
          {
            id: postID,
            message: savedMessageRef,
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image || 'https://i.imgur.com/MsZzedb.jpg',
            imageURL: downloadURL || 'https://i.imgur.com/XWiwM24.jpg',
            timestamp: Timestamp.now(),
          }
        );

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
      //   console.log('running forced update');
      setForceUpdate((prev) => !prev);
    }
  };

  if (!modalOpen) {
    setUpdatePostViaModal(false);
  }

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
                      <InputboxModalHeader
                        Icon={XIcon}
                        setModalOpen={setModalOpen}
                        preSendPost={preSendPost}
                      />
                      <hr className='border mt-2 w-[100vw] ml-[-2rem]' />
                      <div className='mt-2'>
                        <InputboxModalUserInfo />
                        <InputboxModalTextareaForm
                          setSavedMessageRef={setSavedMessageRef}
                          removePhotoToPost={removePhotoToPost}
                          photoToPost={photoToPost}
                          textareaRef={textareaRef}
                        />
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

                  <InputboxModalButton
                    onClick={() => {
                      if (session) {
                        photoPickerRef?.current?.click();
                      }
                    }}
                    Icon={CameraIcon}
                    title='Photo/Video'
                    iconColor=' text-green-400'
                    fileUpload={true}
                    fileUploadOnChange={(e) => addPhotoToPost(e)}
                    refProp={photoPickerRef}
                  />
                  <InputboxModalButton
                    Icon={VideoCameraIcon}
                    title='Live Video'
                    iconColor='text-red-500 '
                  />
                  <InputboxModalButton
                    Icon={UserIcon}
                    title='Tag People'
                    iconColor='text-blue-600 '
                  />
                  <InputboxModalButton
                    Icon={EmojiHappyIcon}
                    title='Feeling/Activity'
                    iconColor='text-yellow-300 '
                  />
                  <InputboxModalButton
                    Icon={LocationMarkerIcon}
                    title='Check In'
                    iconColor='text-orange-600 '
                  />
                  <InputboxModalButton
                    Icon={ColorSwatchIcon}
                    title='Background Change'
                    iconColor='text-teal-400'
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
