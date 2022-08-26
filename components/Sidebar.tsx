import { useSession } from 'next-auth/react';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';

import { Divider, SidebarRow, SidebarYourShortcuts } from '../components';
import { ViewListIcon } from '@heroicons/react/outline';

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const { theme } = useContext(ThemeContext);
  const { setViewEveryonesPosts, viewEveryonesPosts } = useContext(DataContext);
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <div
      className={` hidden md:block p-2 pt-5 max-w-[600px] ${
        openMenu ? '2xl:min-w-[400px]' : 'w-12 '
      }  ${
        !theme ? 'themeLight bg-gray-50 shadow ' : 'themeDark bg-slate-800'
      }`}>
      <p
        onClick={() => setOpenMenu((prev) => !prev)}
        className={`flex items-center gap-2 ${
          openMenu ? 'ml-3' : 'mx-auto'
        } mb-2 cursor-pointer ${
          !theme
            ? 'lightTheme text-gray-300 hover:text-gray-400'
            : 'darkTheme hover:text-white'
        }`}>
        {openMenu && (
          <XIcon
            className={` h-8 ${
              !theme ? 'lightTheme' : 'darkTheme'
            }text-gray-300 h-12 ml-2`}
          />
        )}
        {!openMenu && (
          <ViewListIcon
            className={` h-8 ${
              !theme ? 'lightTheme' : 'darkTheme'
            }text-gray-400 `}
          />
        )}
      </p>

      {openMenu && (
        <div>
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
            onClick={() => setViewEveryonesPosts((prev: any) => !prev)}
          />
          <SidebarRow
            image={'/images/FacebookIcons/friends.png'}
            title='Friends'
          />
          <SidebarRow
            image={'/images/FacebookIcons/groups.png'}
            title='Groups'
          />
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
      )}
    </div>
  );
};
