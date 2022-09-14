import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { DataContext } from '../DataContext';
import {
  InputboxModalHeaderCreatePost,
  InputboxModalHeaderAddComment,
  InputboxModalHeaderUpdatePost,
  InputboxModalHeaderUpdateComment,
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
    openCommentBox,
    newPostBtnClicked,
    addingNewComment,
    updatingComment,
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
      {newPostBtnClicked &&
        !updatePostViaModal &&
        !addingNewComment &&
        !updatingComment && (
          <InputboxModalHeaderCreatePost
            setModalOpen={setModalOpen}
            preSendPost={(e) => preSendPost(e)}
          />
        )}
      {!newPostBtnClicked &&
        updatePostViaModal &&
        !addingNewComment &&
        !updatingComment && (
          <InputboxModalHeaderUpdatePost setModalOpen={setModalOpen} />
        )}
      {!newPostBtnClicked &&
        updatePostViaModal &&
        !addingNewComment &&
        updatingComment && (
          <InputboxModalHeaderUpdateComment setModalOpen={setModalOpen} />
        )}
      {!newPostBtnClicked &&
        !updatePostViaModal &&
        openCommentBox &&
        addingNewComment &&
        !updatingComment && (
          <InputboxModalHeaderAddComment
            setModalOpen={setModalOpen}
            preSendPost={(e) => preSendPost(e, true)}
          />
        )}
    </div>
  );
};
