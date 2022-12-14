import React, { SetStateAction } from 'react';
import { useContext } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { ThemeContext } from '../ThemeContext';

interface Props {
  login: 'signin' | 'signout';
  setOpenMenu?: React.Dispatch<SetStateAction<boolean>>;
  openMenu?: boolean;
}

export const SignInOutButton = ({ login, setOpenMenu, openMenu }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <button
        className={`py-2 px-3 rounded-full w-24 ml-5  ${
          !theme
            ? 'themeLight bg-blue-500 text-white hover:bg-blue-600 '
            : ' themeDark shadow border border-white hover:bg-blue-500 hover:border-0'
        }`}
        onClick={
          login === 'signin'
            ? () => {
                signIn();

                if (openMenu) {
                  setOpenMenu(false);
                }
              }
            : () => {
                signOut();
                if (openMenu) {
                  setOpenMenu(false);
                }
              }
        }>
        {login === 'signin' ? 'Sign In' : 'Sign Out'}
      </button>
    </>
  );
};
