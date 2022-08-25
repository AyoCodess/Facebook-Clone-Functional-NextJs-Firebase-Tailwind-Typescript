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
      className={`py-4 mx-4 flex-grow text-center font-medium rounded-t-lg  cursor-pointer ${
        active
          ? `border-b-2  border-blue-500 ${
              !theme ? 'lightTheme text-blue-500   ' : 'darkTheme  text-white '
            }`
          : `${
              !theme
                ? 'lightTheme hover:bg-gray-100'
                : 'darkTheme hover:bg-blue-500'
            }`
      }`}>
      {title}
    </p>
  );
};
