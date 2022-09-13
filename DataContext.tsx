import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useMemo,
} from 'react';

interface Props {
  children: React.ReactNode;
}
interface DataContextType {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  viewEveryonesPosts: boolean;
  setViewEveryonesPosts: Dispatch<SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  forceUpdate: boolean;
  setForceUpdate: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  postMessageInModal: string;
  setPostMessageInModal: Dispatch<SetStateAction<string>>;
  updatePostViaModal: boolean;
  setUpdatePostViaModal: Dispatch<SetStateAction<boolean>>;
  postIdRefState: any;
  setPostIdRefState: Dispatch<SetStateAction<string>>;
  emailRefState: any;
  setEmailRefState: Dispatch<SetStateAction<string>>;
  openCommentBox: boolean;
  setOpenCommentBox: Dispatch<SetStateAction<boolean>>;
  loadCommentBox: boolean;
  setLoadCommentBox: Dispatch<SetStateAction<boolean>>;
  savedMessageRef: string;
  setSavedMessageRef: Dispatch<SetStateAction<string | null>>;
  commentForceUpdate: boolean;
  setCommentForceUpdate: Dispatch<SetStateAction<boolean>>;
  commentBoxClicked: boolean;
  setCommentBoxClicked: Dispatch<SetStateAction<boolean>>;
  newPostBtnClicked: boolean;
  setNewPostBtnClicked: Dispatch<SetStateAction<boolean>>;
  addingNewComment: boolean;
  setAddingNewComment: Dispatch<SetStateAction<boolean>>;
}
export const DataContext = createContext<DataContextType>({
  show: false,
  setShow: () => {},
  title: '',
  setTitle: () => {},
  description: '',
  setDescription: () => {},
  viewEveryonesPosts: false,
  setViewEveryonesPosts: () => {},
  modalOpen: false,
  setModalOpen: () => {},
  forceUpdate: false,
  setForceUpdate: () => {},
  loading: false,
  setLoading: () => {},
  postMessageInModal: '',
  setPostMessageInModal: () => {},
  updatePostViaModal: false,
  setUpdatePostViaModal: () => {},
  postIdRefState: '',
  setPostIdRefState: () => {},
  openCommentBox: false,
  setOpenCommentBox: () => {},
  loadCommentBox: false,
  setLoadCommentBox: () => {},
  emailRefState: '',
  setEmailRefState: () => {},
  savedMessageRef: '',
  setSavedMessageRef: () => {},
  commentForceUpdate: false,
  setCommentForceUpdate: () => {},
  commentBoxClicked: false,
  setCommentBoxClicked: () => {},
  newPostBtnClicked: true,
  setNewPostBtnClicked: () => {},
  addingNewComment: false,
  setAddingNewComment: () => {},
});

export const DataProvider = ({ children }: Props) => {
  // view all posts from all users in the database
  const [viewEveryonesPosts, setViewEveryonesPosts] = useState(true);

  // modal open state
  const [modalOpen, setModalOpen] = useState(false);
  const [postMessageInModal, setPostMessageInModal] = useState('');
  const [updatePostViaModal, setUpdatePostViaModal] = useState(false);

  // toast
  const [show, setShow] = useState(false); // used to alter user that the database is not writable yet
  const [title, setTitle] = useState('Cannot send post to database');
  const [description, setDescription] = useState(
    'To stop spam I have locked the database'
  );

  // used to set the postIdRef for the update and delete post functions
  const [postIdRefState, setPostIdRefState] = useState(null);
  // used to get original posters email address so we can link comments to that post
  const [emailRefState, setEmailRefState] = useState(null);

  // user post written content saved via the inputbox modal
  const [savedMessageRef, setSavedMessageRef] = useState<string | null>(null);

  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [loadCommentBox, setLoadCommentBox] = useState(false);
  const [commentForceUpdate, setCommentForceUpdate] = useState(false);
  const [commentBoxClicked, setCommentBoxClicked] = useState(false);
  // controls post comment realtime updates
  const [newPostBtnClicked, setNewPostBtnClicked] = useState(true);
  const [addingNewComment, setAddingNewComment] = useState(false);

  const [forceUpdate, setForceUpdate] = useState(false); // updates posts when new post is added
  const [loading, setLoading] = useState(false); // loading posts

  const contextValues = useMemo(
    () => ({
      show,
      setShow,
      title,
      setTitle,
      description,
      setDescription,
      viewEveryonesPosts,
      setViewEveryonesPosts,
      modalOpen,
      setModalOpen,
      forceUpdate,
      setForceUpdate,
      loading,
      setLoading,
      postMessageInModal,
      setPostMessageInModal,
      updatePostViaModal,
      setUpdatePostViaModal,
      postIdRefState,
      setPostIdRefState,
      openCommentBox,
      setOpenCommentBox,
      loadCommentBox,
      setLoadCommentBox,
      emailRefState,
      setEmailRefState,
      savedMessageRef,
      setSavedMessageRef,
      commentForceUpdate,
      setCommentForceUpdate,
      commentBoxClicked,
      setCommentBoxClicked,
      newPostBtnClicked,
      setNewPostBtnClicked,
      addingNewComment,
      setAddingNewComment,
    }),
    [
      show,
      setShow,
      title,
      setTitle,
      description,
      setDescription,
      viewEveryonesPosts,
      setViewEveryonesPosts,
      modalOpen,
      setModalOpen,
      forceUpdate,
      setForceUpdate,
      loading,
      setLoading,
      postMessageInModal,
      setPostMessageInModal,
      updatePostViaModal,
      setUpdatePostViaModal,
      postIdRefState,
      setPostIdRefState,
      openCommentBox,
      setOpenCommentBox,
      loadCommentBox,
      setLoadCommentBox,
      emailRefState,
      setEmailRefState,
      savedMessageRef,
      setSavedMessageRef,
      commentForceUpdate,
      setCommentForceUpdate,
      commentBoxClicked,
      setCommentBoxClicked,
      newPostBtnClicked,
      setNewPostBtnClicked,
      addingNewComment,
      setAddingNewComment,
    ]
  );
  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
};
