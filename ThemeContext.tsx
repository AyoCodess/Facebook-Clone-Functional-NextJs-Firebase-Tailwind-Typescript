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
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(false); // default is light
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
