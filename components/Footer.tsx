import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={` hidden sm:block theme pb-10 pt-5 mx-w-lg mx-auto px-2  ${
        !theme ? 'lightTheme bg-gray-100' : 'darkTheme bg-slate-900'
      }`}>
      <p className='text-center'>
        <span className='h-10 text-red-600'>♥</span> Made with a lot of
        enthusiasm and drive by
        <span className='font-bold'>&nbsp;Ayo D adesanya.</span>
        <span className='lg:hidden'>
          &nbsp;View the desktop version for more functionality.
        </span>
      </p>
    </footer>
  );
};
