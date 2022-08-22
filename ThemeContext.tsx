import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useMemo,
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
