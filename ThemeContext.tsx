import React, {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
interface ThemeContextType {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: false,
  setTheme: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(false); // default is light

  useEffect(() => {
    const mode = localStorage.getItem('theme');
    if (mode === 'true') {
      setTheme(true);
    }
    if (mode === 'false') {
      setTheme(false);
    }
  }, [theme]);

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
