import React, { SVGProps, useContext } from 'react';
import { ThemeContext } from '../Context';
import { useSession } from 'next-auth/react';

interface Props {
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  active?: boolean;
}
export const HeaderIcon = ({ Icon, active }: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  return (
    <div
      className={`flex items-center cursor-pointer  ${
        !session ? 'xl:px-6' : '2xl:px-8  xl:px-6 lg:px-3'
      } sm:h-14  rounded-xl active:border-b-2 active:border-blue-500 group  group-hover:text-white-500 ${
        !theme ? 'themeLight hover:bg-gray-100' : 'themeDark hover:bg-blue-500'
      }`}>
      {!theme && (
        // dark theme
        <Icon
          className={`h-5 text-gray-500 text-center sm:h-7 mx-auto group-hover:text-blue-500  ${
            active && 'text-blue-500'
          }`}
        />
      )}
      {theme && (
        // light theme
        <Icon
          className={`h-5 text-white text-center sm:h-7 mx-auto group-hover:text-white-500  ${
            active && 'text-blue-500 group-hover:text-white'
          }`}
        />
      )}
    </div>
  );
};
