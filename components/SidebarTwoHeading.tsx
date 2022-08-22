import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
interface Props {
  title: string;
  custom?: string;
}

export const SidebarTwoHeading = ({ title, custom }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`font-bold text-xl  pl-2 mt-4 ${custom} ${
        !theme
          ? 'themeLight text-gray-500 bg-transparent'
          : 'themeDark text-white bg-transparent'
      }`}>
      {title}
    </div>
  );
};
