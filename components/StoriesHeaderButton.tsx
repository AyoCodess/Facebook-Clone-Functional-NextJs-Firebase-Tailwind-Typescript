import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface Props {
  title: string;
  active?: boolean;
}
export const StoriesHeaderButton = ({ title, active }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <p
      className={`py-4 mx-4 flex-grow text-center font-medium  cursor-pointer ${
        active ? 'border-b-2  border-blue-500' : ''
      } ${
        !theme
          ? 'lightTheme text-blue-400 '
          : 'darkTheme text-white border-white'
      } `}>
      {title}
    </p>
  );
};
