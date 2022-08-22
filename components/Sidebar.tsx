import { useSession } from 'next-auth/react';
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import { ChevronDownIcon } from '@heroicons/react/outline';

import { Divider, SidebarRow, SidebarYourShortcuts } from '../components';

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const { theme } = useContext(ThemeContext);
  const { setViewEveryonesPosts, viewEveryonesPosts } = useContext(DataContext);

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
      <SidebarRow
        image={'/images/FacebookIcons/viewall.png'}
        title={`${
          !viewEveryonesPosts ? "View Everyone's Posts" : ' View Your Posts'
        }`}
        onClick={() => setViewEveryonesPosts((prev) => !prev)}
      />
      <SidebarRow image={'/images/FacebookIcons/friends.png'} title='Friends' />
      <SidebarRow image={'/images/FacebookIcons/groups.png'} title='Groups' />
      <SidebarRow
        image={'/images/FacebookIcons/marketplace.png'}
        title='Marketplace'
      />
      <SidebarRow image={'/images/FacebookIcons/watch.png'} title='Watch' />

      <SidebarRow
        image={'/images/FacebookIcons/memories.png'}
        title='Memories'
      />
      <SidebarRow
        Icon={ChevronDownIcon}
        title='See More'
        custom={'rounded-full p-2 bg-gray-200 text-black'}
      />

      <Divider custom={'my-[1rem] mx-4 mb-6 '} />
      <SidebarYourShortcuts />
    </div>
  );
};
