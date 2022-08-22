import React, { SVGProps, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useSession } from 'next-auth/react';

interface Props {
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  active?: boolean;
}
export const HeaderIcon = ({ Icon, active }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex items-center cursor-pointer sm:h-14 xxl:px-8 xxxl:px-12 xxxxl:px-14  active:border-b-2 active:border-blue-500 group  group-hover:text-white-500 ${
        !theme ? 'themeLight hover:bg-gray-100' : 'themeDark hover:bg-blue-500'
      } ${
        active
          ? 'border-b-4 border-blue-600 rounded-none hover:bg-transparent'
          : 'rounded-xl'
      }  `}>
      {!theme && (
        // dark theme
        <Icon
          className={`h-5 text-gray-500 text-center sm:h-9 mx-auto group-hover:text-blue-500  ${
            active && 'text-blue-500 '
          }`}
        />
      )}
      {theme && (
        // light theme
        <Icon
          className={`h-5 text-white text-center sm:h-9 mx-auto group-hover:text-white-500  ${
            active && 'text-blue-500 group-hover:text-white'
          }`}
        />
      )}
    </div>
  );
};
