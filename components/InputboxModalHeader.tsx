import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { DataContext } from '../DataContext';
import { doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import cryptoRandomString from 'crypto-random-string';
import {
  InputboxModalHeaderCreatePost,
  InputboxModalHeaderAddComment,
  InputboxModalHeaderUpdatePost,
} from '.';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preSendPost: (
    e: React.MouseEvent<HTMLButtonElement>,
    comment?: boolean
  ) => Promise<void>;
}

export const InputboxModalHeader = ({
  Icon,
  setModalOpen,
  preSendPost,
}: Props) => {
  const { data: session } = useSession();
  const {
    updatePostViaModal,
    postIdRefState,
    setForceUpdate,
    postMessageInModal,
    setUpdatePostViaModal,
    openCommentBox,
    setLoadCommentBox,
    setCommentForceUpdate,
    newPostBtnClicked,
    addingNewComment,
  } = useContext(DataContext);
  return (
    <div className={`flex justify-between items-center cursor-pointer `}>
      {/*banner */}
      <Icon
        className='h-6 hover:text-gray-500'
        onClick={() => {
          setModalOpen(false);
        }}
      />
      {newPostBtnClicked && !updatePostViaModal && !addingNewComment && (
        <InputboxModalHeaderCreatePost
          setModalOpen={setModalOpen}
          preSendPost={(e) => preSendPost(e)}
        />
      )}
      {!newPostBtnClicked && updatePostViaModal && !addingNewComment && (
        <InputboxModalHeaderUpdatePost
          setModalOpen={setModalOpen}
          preSendPost={preSendPost}
        />
      )}
      {!newPostBtnClicked &&
        !updatePostViaModal &&
        openCommentBox &&
        addingNewComment && (
          <InputboxModalHeaderAddComment
            setModalOpen={setModalOpen}
            preSendPost={(e) => preSendPost(e, true)}
          />
        )}
    </div>
  );
};
