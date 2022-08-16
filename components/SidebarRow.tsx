import Image from 'next/image';
import React, { SVGProps, useContext } from 'react';
import { ThemeContext } from '../Context';

interface Props {
  src?: string | null | undefined;
  Icon?: React.FC<SVGProps<SVGSVGElement>>;
  title: string | null | undefined;
}

export const SidebarRow = ({ src, Icon, title }: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className='flex items-center gap-2 p-4 rounded-xl hover:bg-gray-200 cursor-pointer'>
      {src && (
        <Image
          className='rounded-full'
          src={src}
          width={30}
          height={30}
          layout='fixed'
        />
      )}
      {Icon && (
        <Icon
          className={`h-8 w-8 transition duration-700 ${
            !theme ? 'text-blue-500' : 'text-white'
          } `}
        />
      )}
      <p
        className={`hidden sm:inline-flex font-medium transition duration-700 ${
          !theme ? '' : 'text-white'
        }`}>
        {title}
      </p>
    </div>
  );
};
