import React, {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
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
