import React from 'react';
import {
  SidebarTwoFriendRequests,
  SidebarTwoPagesAndProfiles,
  SidebarTwoSponsored,
} from '../components';

export const SidebarTwo = () => {
  return (
    <div className=' hidden max-w-[50rem]  pb-44  pt-4 lg:flex flex-col px-4'>
      <SidebarTwoSponsored />
      <SidebarTwoPagesAndProfiles />
      <SidebarTwoFriendRequests />
    </div>
  );
};
