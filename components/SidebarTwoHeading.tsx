import React from 'react';

interface Props {
  title: string;
  custom?: string;
}

export const SidebarTwoHeading = ({ title, custom }: Props) => {
  return (
    <div className={`font-bold text-xl text-gray-500 pl-2 mt-4 ${custom}`}>
      {title}
    </div>
  );
};
