import React from 'react';

export const StoriesHeader = () => {
  return (
    <div
      className={`flex justify-between rounded-t-xl items-center bg-white border-b border-gray-200 text-xl py-1`}>
      <p className='py-4 mx-4 flex-grow text-center font-medium text-blue-400 cursor-pointer border-b-2 border-blue-500  '>
        Stories
      </p>
      <p className='py-4 mx-4 flex-grow text-center font-medium text-gray-400 cursor-pointer hover:bg-gray-100 bg-transparent rounded-lg'>
        Reels
      </p>
      <p className='py-4 mx-4 flex-grow text-center font-medium text-gray-400 cursor-pointer hover:bg-gray-100 bg-transparent rounded-lg'>
        Rooms
      </p>
    </div>
  );
};
