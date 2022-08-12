import React, { SVGProps } from 'react';

interface Props {
  Icon: React.FC<SVGProps<SVGSVGElement>>;
}
export const HeaderIcon = ({ Icon }: Props) => {
  return (
    <div className='flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl active:border-b-2 active:border-blue-500 group '>
      <Icon className='h-5 group-hover:text-blue-500' />
    </div>
  );
};
