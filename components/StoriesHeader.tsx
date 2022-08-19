import React from 'react';

export const StoriesHeader = () => {
  return (
    <div
      className={`flex justify-between items-center bg-white border-b border-gray-200`}>
      <p className='py-4 mx-4 flex-grow text-center font-medium text-blue-400 cursor-pointer border-b-2 border-blue-500'>
        Stories
      </p>
      <p className='py-4 mx-4 flex-grow text-center font-medium text-gray-400 cursor-pointer'>
        Reels
      </p>
      <p className='py-4 mx-4 flex-grow text-center font-medium text-gray-400 cursor-pointer'>
        Rooms
      </p>
    </div>
  );
};
