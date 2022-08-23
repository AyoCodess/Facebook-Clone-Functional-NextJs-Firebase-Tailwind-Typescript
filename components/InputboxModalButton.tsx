import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useSession } from 'next-auth/react';
import { VideoCameraIcon } from '@heroicons/react/solid';

interface Props {
  iconColor: string;
  title: string;
}
export const InputboxModalButton = ({ iconColor, title }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();
  return (
    <div
      className={`inputIcon ${!theme ? '' : 'hover:bg-blue-500 '} ${
        session ? ' ' : ' hover:bg-transparent cursor-default'
      }`}>
      <VideoCameraIcon className={`h-7 ${iconColor}  `} />
      <p
        className={`text-xs sm:text-sm xl:text-base ${
          !theme ? 'themeLight bg-transparent' : 'themeDark bg-transparent'
        }`}>
        {title}
      </p>
    </div>
  );
};
