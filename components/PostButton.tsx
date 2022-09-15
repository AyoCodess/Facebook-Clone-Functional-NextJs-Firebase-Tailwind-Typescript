import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  disable?: boolean;
  onClick?: () => void;
}

export const PostButton = ({ Icon, title, onClick, disable }: Props) => {
  const { theme } = useContext(ThemeContext);

  console.log(disable);
  return (
    <button
      onClick={onClick}
      className={`
      inputIcon p-3 rounded-none group  
      ${disable === true ? 'text-gray-400 hover:bg-gray-200' : ''}
      ${!theme ? 'lightTheme' : 'darkTheme hover:bg-blue-500 text-white'}
       
      `}>
      <Icon
        className={`h-4 text-blue-500  
        ${disable === true ? 'text-gray-400 group-hover:text-gray-400 ' : ''}
        ${!theme ? 'lightTheme  ' : ' darkTheme group-hover:text-white'}`}
      />
      <p className='text-xs sm:text-base'>{title}</p>
    </button>
  );
};
