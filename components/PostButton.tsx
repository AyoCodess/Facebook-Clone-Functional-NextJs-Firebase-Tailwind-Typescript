import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
}

export const PostButton = ({ Icon, title }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`inputIcon p-3 rounded-none group ${
        !theme ? 'lightTheme' : 'darkTheme hover:bg-blue-500 text-white'
      }`}>
      <Icon
        className={`h-4 text-blue-500  ${
          !theme ? 'lightTheme  ' : ' darkTheme group-hover:text-white'
        }`}
      />
      <p className='text-xs sm:text-base'>{title}</p>
    </div>
  );
};
