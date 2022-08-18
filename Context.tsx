import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';
export const ThemeContext = createContext<ThemeContextType>({});

interface Props {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(false); // default is light

  // will be moved to a different context file if the aoo grows
  const [show, setShow] = useState(false); // used to alter user that the database is not writable yet
  const [title, setTitle] = useState('Cannot send post to database');
  const [description, setDescription] = useState(
    'To stop spam I have locked the database'
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        show,
        setShow,
        title,
        setTitle,
        description,
        setDescription,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
