import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useMemo,
} from 'react';

export const ThemeContext = createContext({
  theme: false,
  setTheme: (theme: false) => {},
});

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(false); // default is light

  const contextValues = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  );
  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  );
};
