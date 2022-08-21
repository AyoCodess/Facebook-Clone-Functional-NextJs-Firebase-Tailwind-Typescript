import React from 'react';
import { SidebarTwoHeading } from './SidebarTwoHeading';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { SidebarRow } from '../components';

const shortcuts = [
  { name: 'Stop holding back', image: 'https://i.imgur.com/FRIs3ds.png?1' },
  { name: 'Computer Science CS50', image: 'https://i.imgur.com/21RSfVJ.jpg' },
  { name: 'All about bruce lee', image: 'https://i.imgur.com/fKt5tuD.jpg' },
  { name: 'How to usw VScode', image: 'https://i.imgur.com/q2X94gw.png' },
  { name: 'Happy hour', image: 'https://i.imgur.com/fm3wJ0g.jpg' },
  { name: 'How to usw VScode', image: 'https://i.imgur.com/q2X94gw.png' },
  { name: 'Happy hour', image: 'https://i.imgur.com/fm3wJ0g.jpg' },
  { name: 'How to usw VScode', image: 'https://i.imgur.com/q2X94gw.png' },
  { name: 'Happy hour', image: 'https://i.imgur.com/fm3wJ0g.jpg' },

  ,
];

export const SidebarYourShortcuts = () => {
  return (
    <>
      <div className='hidden sm:block '>
        <SidebarTwoHeading title={'Your Shortcuts'} />
        <ul className='mt-2'>
          {shortcuts.map((shortcut) => (
            <li
              key={shortcut!.name}
              className='py-3 pl-4 flex items-center cursor-pointer  hover:bg-gray-100 bg-transparent'>
              <img
                className='h-12 w-12 rounded-lg object-cover'
                src={shortcut!.image}
                alt=''
              />
              <div className='ml-3'>
                <p className='text-xl font-medium text-gray-900 p-2'>
                  {shortcut!.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <SidebarRow
        Icon={ChevronDownIcon}
        title='See More'
        custom={'rounded-full p-2 bg-gray-200 text-black'}
      />
    </>
  );
};
