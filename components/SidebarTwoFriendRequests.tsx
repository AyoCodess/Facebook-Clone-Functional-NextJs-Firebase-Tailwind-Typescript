import React from 'react';
import { SidebarTwoHeading } from '../components';

export const SidebarTwoFriendRequests = () => {
  return (
    <div>
      {' '}
      <div className='flex justify-between items-center mt-2 '>
        <SidebarTwoHeading title={'Friend Requests'} custom={'mt-0'} />
        <div>see all</div>
      </div>
      <div className='grid grid-cols-3 bg-gray-200  mt-2 ml-2 '>
        <div className='flex justify-between items-center row-span-2'>
          picture
        </div>
        <div className='flex justify-between items-center'>name</div>
        <div className='flex justify-between ml-auto'>time</div>
        <div className='flex justify-between items-center'>mutual friends</div>
        <div className='flex justify-between items-center col-start-2 row-start-3'>
          button 1
        </div>
        <div className='flex justify-between items-center col-start-3 row-start-3'>
          button 2
        </div>
      </div>
      <hr className='mt-4 mx-4 mb-2 border border-gray-200' />
    </div>
  );
};
