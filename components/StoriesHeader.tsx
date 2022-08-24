import React, { useContext } from 'react';
import { StoriesHeaderButton } from '.';
import { ThemeContext } from '../ThemeContext';

export const StoriesHeader = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex justify-between sm:rounded-t-xl items-center sm:text-xl  ${
        !theme
          ? 'lightTheme bg-white border-gray-200  border-b  '
          : 'darkTheme bg-slate-800'
      }`}>
      <StoriesHeaderButton title='Stories' active={true} />
      <StoriesHeaderButton title='Reels' />
      <StoriesHeaderButton title='Rooms' />
    </div>
  );
};
