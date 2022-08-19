import React from 'react';

interface Props {
  title: string;
}

export const SidebarTwoHeading = ({ title }: Props) => {
  return <div>{title}</div>;
};
