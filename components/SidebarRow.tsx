import Image from 'next/image';
import React, { SVGProps, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface Props {
  src?: string | null | undefined;
  Icon?: React.FC<SVGProps<SVGSVGElement>>;
  title: string | null | undefined;
  custom?: string | null | undefined;
  image?: string;
  onClick?: () => void;
}

export const SidebarRow = ({
  src,
  Icon,
  title,
  custom,
  image,
  onClick,
}: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 p-3 rounded-xl  cursor-pointer ${
        !theme
          ? ' themeLight hover:bg-gray-100 bg-transparent'
          : 'hover:bg-blue-500'
      }`}>
      {src && (
        <img className='rounded-full h-8 w-8 md:h-10 md:w-10 ml-1' src={src} />
      )}
      {Icon && (
        <Icon
          className={` h-8 w-8 md:h-10 md:w-10 ml-1 ${
            !theme
              ? 'themeLight text-blue-500 bg-transparent'
              : 'themeDark bg-transparent'
          } ${custom}`}
        />
      )}
      {image && (
        <Image src={image} width={50} height={50} alt='logo' layout='fixed' />
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
