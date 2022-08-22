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
}

export const DataContext = createContext<DataContextType>({});

export const DataProvider = ({ children }: Props) => {
  // view all posts from all users in the database
  const [viewEveryonesPosts, setViewEveryonesPosts] = useState<boolean>(false);

  // toast
  const [show, setShow] = useState(false); // used to alter user that the database is not writable yet
  const [title, setTitle] = useState('Cannot send post to database');
  const [description, setDescription] = useState(
    'To stop spam I have locked the database'
  );

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
    ]
  );
  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
};
