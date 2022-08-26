/* eslint-disable @next/next/no-img-element */
import { SearchIcon } from '@heroicons/react/outline';
import { CameraIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import React, { useContext } from 'react';
import { SidebarTwoHeading } from './SidebarTwoHeading';
import { ThemeContext } from '../ThemeContext';

export const SidebarTwoContacts = () => {
  const { theme } = useContext(ThemeContext);
  const contacts = [
    {
      id: 1,
      name: 'Rev Angel Kyodo Williams',
      image: '/images/contacts/rev.jpeg',
      link: 'https://revangel.com/',
    },
    {
      id: 2,
      name: 'Dr Jaiya John',
      image: '/images/contacts/jaiyajohn.jpeg',
      link: 'https://www.instagram.com/jaiyajohn/channel/?hl=en-gb',
    },
    {
      id: 3,
      name: 'Erin Merelli',
      image: '/images/contacts/erin.jpeg',
      link: 'https://deathwives.org/',
    },
    {
      id: 4,
      name: 'Kimberly Ann Johnson',
      image: '/images/contacts/kimberly.jpeg',
      link: 'https://www.instagram.com/kimberly.ann.johnson/?hl=en',
    },
    {
      id: 5,
      name: 'Maya Angelou',
      image: '/images/contacts/maya.jpeg',
      link: 'https://en.wikipedia.org/wiki/Maya_Angelou',
    },

    {
      id: 6,
      name: 'Dr Sará King',
      image: '/images/contacts/saraking.jpeg',
      link: 'https://www.instagram.com/mindheartcollective/?hl=en',
    },
    {
      id: 7,
      name: 'Alexis Shotwell',
      image: '/images/contacts/alexisshotwell.jpeg',
      link: 'https://alexisshotwell.com/',
    },

    {
      id: 8,
      name: 'Sarah Durham Wilson',
      image: '/images/contacts/SarahDurhamWilson.webp',
      link: 'https://www.instagram.com/sarahofmagdalene/?hl=en',
    },

    {
      id: 9,
      name: 'Adrienne Marie Brown',
      image: '/images/contacts/adriennemareebrown.jpeg',
      link: 'https://www.instagram.com/adriennemareebrown/?hl=en',
    },
    {
      id: 10,
      name: 'Martin Luther King Jr',
      image: '/images/contacts/martinlutherking.jpeg',
      link: 'https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.',
    },
  ];
  return (
    <div>
      <div className='flex justify-between items-center mt-3 '>
        <SidebarTwoHeading title={'Contacts'} custom={'mt-0'} />
        <div className='flex items-center justify-between w-40'>
          <CameraIcon className='h-6 hover:text-gray-400 cursor-pointer' />
          <SearchIcon className='h-6 hover:text-gray-400 cursor-pointer' />
          <DotsHorizontalIcon className='h-6 hover:text-gray-400 cursor-pointer' />
        </div>
      </div>

      <ul className='mt-2'>
        {contacts.map((contact) => (
          <a
            key={contact.id}
            href={contact.link}
            target='_blank'
            rel='noopener noreferrer'>
            <li
              key={contact.id}
              className={` relative py-3 pl-4 flex items-center cursor-pointer   
             rounded-xl ${
               !theme
                 ? 'lightTheme hover:bg-gray-200'
                 : 'darkTheme hover:bg-blue-500 '
             }`}>
              <img
                className='h-12 w-12 rounded-full object-cover'
                src={contact!.image}
                alt={contact.name}
              />
              <div className='absolute bottom-3 left-[3.3rem] border-2 border-white bg-green-500 h-[0.9rem] w-[0.9rem] rounded-full'></div>
              <div className='ml-3'>
                <p
                  className={`text-xl font-medium p-2 cursor-pointer ${
                    !theme
                      ? 'lightTheme text-gray-900 '
                      : 'darkTheme text-white '
                  }`}>
                  {contact!.name}
                </p>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};
