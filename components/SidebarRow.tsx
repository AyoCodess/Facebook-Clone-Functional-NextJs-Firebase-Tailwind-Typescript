import Image from 'next/image';
import React, { SVGProps } from 'react';

interface Props {
  src?: string | null | undefined;
  Icon?: React.FC<SVGProps<SVGSVGElement>>;
  title: string | null | undefined;
}

export const SidebarRow = ({ src, Icon, title }: Props) => {
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
      {Icon && <Icon className='h-8 w-8 text-blue-500' />}
      <p className='hidden sm:inline-flex font-medium'>{title}</p>
    </div>
  );
};
