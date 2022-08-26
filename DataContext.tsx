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
});

export const DataProvider = ({ children }: Props) => {
  // view all posts from all users in the database
  const [viewEveryonesPosts, setViewEveryonesPosts] = useState(true);

  // toast
  const [show, setShow] = useState(false); // used to alter user that the database is not writable yet
  const [title, setTitle] = useState('Cannot send post to database');
  const [description, setDescription] = useState(
    'To stop spam I have locked the database'
  );

  const [forceUpdate, setForceUpdate] = useState(false); // updates posts when new post is added
  const [modalOpen, setModalOpen] = useState(false);
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
    ]
  );
  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
};
