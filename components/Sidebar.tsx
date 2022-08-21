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

import { SidebarRow, SidebarYourShortcuts } from '../components';

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className={` hidden md:block p-2 pt-5 max-w-[600px] 2xl:min-w-[500px] ${
        !theme ? 'themeLight bg-gray-50 shadow ' : 'themeDark bg-slate-800'
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
      <SidebarRow
        Icon={ChevronDownIcon}
        title='See More'
        custom={'rounded-full p-2 bg-gray-200 text-black'}
      />
      <hr className='mt-[0.1rem] mx-4 mb-2 border border-gray-200' />
      <SidebarYourShortcuts />
    </div>
  );
};
