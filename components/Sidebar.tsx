import { useSession } from 'next-auth/react';
import React, { useContext } from 'react';
import { ThemeContext } from '../Context';
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from '@heroicons/react/solid';

import { SidebarRow } from '../components';

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className={`p-2 pt-5 max-w-[600px] xl:min-w-[300px] ${
        !theme ? 'themeLight' : 'themeDark bg-slate-800'
      }`}>
      {session && (
        <SidebarRow
          src={session.user?.image}
          //   Icon={UsersIcon}
          title={session.user?.name}
        />
      )}
      <SidebarRow Icon={UsersIcon} title='Friends' />
      <SidebarRow Icon={UserGroupIcon} title='Groups' />
      <SidebarRow Icon={ShoppingBagIcon} title='Marketplace' />
      <SidebarRow Icon={DesktopComputerIcon} title='Watch' />
      <SidebarRow Icon={CalendarIcon} title='Events' />
      <SidebarRow Icon={ClockIcon} title='Memories' />
      <SidebarRow Icon={ChevronDownIcon} title='See More' />
    </div>
  );
};
