import React from 'react';
import { Divider } from './Divider ';
import { SidebarTwoHeading } from './SidebarTwoHeading';

export const SidebarTwoSponsored = () => {
  return (
    <div>
      <SidebarTwoHeading title={'Sponsored'} />
      <Divider custom={'mt-4 mx-4 '} />
    </div>
  );
};
