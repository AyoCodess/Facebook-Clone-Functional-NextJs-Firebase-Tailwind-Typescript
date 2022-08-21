import { SearchIcon } from '@heroicons/react/outline';
import { CameraIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import React from 'react';
import { SidebarTwoHeading } from './SidebarTwoHeading';

export const SidebarTwoContacts = () => {
  const contacts = [
    {
      id: 1,
      name: 'Stop holding back',
      image: 'https://i.imgur.com/FRIs3ds.png?1',
    },
    {
      id: 2,
      name: 'Computer Science CS50',
      image: 'https://i.imgur.com/21RSfVJ.jpg',
    },
    {
      id: 3,
      name: 'All about bruce lee',
      image: 'https://i.imgur.com/fKt5tuD.jpg',
    },
    {
      id: 4,
      name: 'How to usw VScode',
      image: 'https://i.imgur.com/q2X94gw.png',
    },
    {
      id: 5,
      name: 'Happy weekend hour',
      image: 'https://i.imgur.com/fm3wJ0g.jpg',
    },
    {
      id: 6,
      name: 'Stop holding back',
      image: 'https://i.imgur.com/FRIs3ds.png?1',
    },
    {
      id: 7,
      name: 'Computer Science CS50',
      image: 'https://i.imgur.com/21RSfVJ.jpg',
    },
    {
      id: 8,
      name: 'All about bruce lee',
      image: 'https://i.imgur.com/fKt5tuD.jpg',
    },
    {
      id: 9,
      name: 'How to usw VScodee',
      image: 'https://i.imgur.com/q2X94gw.png',
    },
    {
      id: 10,
      name: 'Happy hour weekday',
      image: 'https://i.imgur.com/fm3wJ0g.jpg',
    },
  ];
  return (
    <div>
      <div className='flex justify-between items-center '>
        <SidebarTwoHeading title={'Contacts'} custom={'mt-0'} />
        <div className='flex items-center justify-between w-40'>
          <CameraIcon className='h-6 hover:text-gray-400' />

          <SearchIcon className='h-6 hover:text-gray-400' />
          <DotsHorizontalIcon className='h-6 hover:text-gray-400' />
        </div>
      </div>

      <ul className='mt-2'>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className=' relative py-3 pl-4 flex items-center cursor-pointer  hover:bg-gray-50 bg-transparent'>
            <img
              className='h-12 w-12 rounded-full object-cover'
              src={contact!.image}
              alt='contact person image'
            />
            <div className='absolute bottom-3 left-[3.3rem] border-2 border-white bg-green-500 h-[0.9rem] w-[0.9rem] rounded-full'></div>
            <div className='ml-3'>
              <p className='text-xl font-medium text-gray-900 p-2'>
                {contact!.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
