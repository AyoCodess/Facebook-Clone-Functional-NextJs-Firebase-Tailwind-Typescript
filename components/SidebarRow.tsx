import Image from 'next/image';
import React, { SVGProps, useContext } from 'react';
import { ThemeContext } from '../Context';

interface Props {
  src?: string | null | undefined;
  Icon?: React.FC<SVGProps<SVGSVGElement>>;
  title: string | null | undefined;
  custom?: string | null | undefined;
}

export const SidebarRow = ({ src, Icon, title, custom }: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className={`flex items-center gap-2 p-4 rounded-xl  cursor-pointer ${
        !theme
          ? ' themeLight hover:bg-gray-100 bg-transparent'
          : 'hover:bg-blue-500'
      }`}>
      {src && (
        <img className='rounded-full h-8 w-8 md:h-10 md:w-10' src={src} />
      )}
      {Icon && (
        <Icon
          className={` h-8 w-8 md:h-10 md:w-10  ${
            !theme
              ? 'themeLight text-blue-500 bg-transparent'
              : 'themeDark bg-transparent'
          } ${custom}`}
        />
      )}
      <p
        className={`hidden sm:inline-flex font-medium text-xl  ${
          !theme ? 'themeLight bg-transparent' : 'themeDark bg-transparent'
        }`}>
        {title}
      </p>
    </div>
  );
};
