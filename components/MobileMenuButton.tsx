import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  viewEveryonesPosts?: boolean;
  title?: string;
}

export const MobileMenuButton = ({
  Icon,
  title,
  onClick,
  viewEveryonesPosts,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex gap-2 h-14 items-center cursor-pointer rounded-xl p-2 ${
        !theme
          ? 'lightTheme hover:bg-gray-100'
          : 'darkTheme hover:bg-blue-500 text-white'
      }`}
      onClick={onClick}>
      <Icon className='icon block' />
      {!title && (
        <p className={`font-medium `}>{`${
          !viewEveryonesPosts ? "View Everyone's Posts" : ' View Your Posts'
        }`}</p>
      )}
      {title && <p className='font-medium'> {title}</p>}
    </div>
  );
};
