import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface Props {
  custom?: string;
}
export const Divider = ({ custom }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <hr
      className={`mt-[0.1rem] mx-4 mb-2 border ${custom} ${
        !theme ? 'lightTheme border-gray-200 ' : 'darkTheme border-blue-800'
      }`}
    />
  );
};
