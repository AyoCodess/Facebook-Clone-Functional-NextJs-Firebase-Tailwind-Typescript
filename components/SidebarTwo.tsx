import React from 'react';
import {
  SidebarTwoFriendRequests,
  SidebarTwoPagesAndProfiles,
  SidebarTwoSponsored,
  SidebarTwoBirthdays,
  SidebarTwoContacts,
} from '../components';

export const SidebarTwo = () => {
  return (
    <aside className=' hidden max-w-[28rem]  pb-44  pt-4 xl:flex flex-col px-4'>
      <SidebarTwoSponsored />
      <SidebarTwoPagesAndProfiles />
      <SidebarTwoFriendRequests />
      <SidebarTwoBirthdays />
      <SidebarTwoContacts />
    </aside>
  );
};
