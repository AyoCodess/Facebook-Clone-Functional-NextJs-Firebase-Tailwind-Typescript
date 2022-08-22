import React, { useContext } from 'react';
import { SidebarTwoHeading, Divider } from '../components';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { ThemeContext } from '../ThemeContext';

const friendRequest = [
  {
    name: 'Hamamat Montia',
    image: '/images/contacts/mat.png',
    friends: 7,
    time: 5,
    smallImage: '/images/friend2.webp',
    smallImageTwo: '/images/friend3.jpeg',
    link: 'https://www.instagram.com/iamhamamat/?hl=en',
  },
];

export const SidebarTwoFriendRequests = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='w-full'>
      {' '}
      <div className='flex justify-between items-center mt-2 '>
        <SidebarTwoHeading title={'Friend Requests'} custom={'mt-0'} />
        <div>
          <span className='text-blue-600 cursor-pointer hover:text-blue-700'>
            See all
          </span>
        </div>
      </div>
      {friendRequest.map((person, i) => (
        <div key={i} className='grid grid-cols-[5rem_1fr_1fr] gap-x-3 mt-2 '>
          <div className='flex justify-between items-center row-span-2'>
            <img
              src={person.image}
              className='h-20 w-20 mr-auto object-cover rounded-full shadow-lg mt-2'
            />
          </div>
          <div className='flex justify-between items-center'>
            <p className='mt-3 font-bold text-lg'>{person.name}</p>
          </div>
          <div className='justify-between'>
            <div className='flex items-center justify-end gap-1 mt-5 text-blue-600'>
              <p className='flex'>{person.time}&nbsp;h </p>
              <PlusCircleIcon className='text-blue-600 h-3' />
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex  relative'>
              <img
                className=' z-20 h-[1.2rem] rounded-full'
                src={person.smallImage}
                alt='friend 1'
              />
              <img
                className=' absolute left-[0.8rem] h-[1.2rem] rounded-full'
                src={person.smallImageTwo}
                alt='friend 2'
              />
              <p
                className={`mb-1 whitespace-nowrap ${
                  !theme ? 'lightTheme text-gray-500 ' : 'darkTheme text-white'
                }`}>
                {person.friends} &nbsp; 217 mutual friends
              </p>
            </div>
          </div>
          <div className='flex justify-between items-center col-start-2 row-start-3'>
            <a href={person.link} target='_blank' rel='noopener'>
              <div className='bg-blue-600 py-2 px-3 text-white rounded-lg w-40 text-center font-medium text-xl hover:bg-blue-500 cursor-pointer transition duration-300'>
                Confirm
              </div>
            </a>
          </div>
          <div className='flex justify-between items-center col-start-3 row-start-3'>
            <div className='bg-gray-300 py-2 px-3 text-gray-600 rounded-lg w-40 text-center font-medium text-xl hover:bg-gray-200 cursor-pointer transition duration-300'>
              Remove
            </div>
          </div>
        </div>
      ))}
      <Divider custom={'mt-5 mx-4 mb-2 '} />
    </div>
  );
};
