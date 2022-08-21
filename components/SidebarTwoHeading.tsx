import React from 'react';

interface Props {
  title: string;
}

export const SidebarTwoHeading = ({ title }: Props) => {
  return (
    <div className='font-bold text-xl text-gray-500 pl-2 mt-4 '>{title}</div>
  );
};
