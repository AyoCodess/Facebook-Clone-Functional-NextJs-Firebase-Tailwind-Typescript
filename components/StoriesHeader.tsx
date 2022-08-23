import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export const StoriesHeader = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex justify-between sm:rounded-t-xl items-center sm:text-xl py-1 ${
        !theme
          ? 'lightTheme bg-white border-gray-200  border-b  '
          : 'darkTheme bg-slate-700'
      }`}>
      <p
        className={`py-4 mx-4 flex-grow text-center font-medium  cursor-pointer border-b-2  border-blue-500 ${
          !theme
            ? 'lightTheme text-blue-400 '
            : 'darkTheme text-white border-white'
        } `}>
        Stories
      </p>
      <p
        className={`py-4 mx-4 flex-grow text-center font-medium  cursor-pointer  rounded-lg ${
          !theme
            ? 'lightTheme text-gray-400 hover:bg-gray-100  '
            : 'darkTheme hover:bg-blue-500'
        }`}>
        Reels
      </p>
      <p
        className={`py-4 mx-4 flex-grow text-center font-medium  cursor-pointer  rounded-lg ${
          !theme
            ? 'lightTheme text-gray-400 hover:bg-gray-100  '
            : 'darkTheme hover:bg-blue-500'
        }`}>
        Rooms
      </p>
    </div>
  );
};
