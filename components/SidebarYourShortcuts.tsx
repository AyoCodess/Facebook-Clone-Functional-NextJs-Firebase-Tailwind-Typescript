/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react';
import { SidebarTwoHeading } from './SidebarTwoHeading';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { SidebarRow } from '../components';
import { ThemeContext } from '../ThemeContext';

const shortcuts = [
  {
    id: 8,
    name: 'Found an issue? Report it',
    image: '/images/bug.jpeg',
    link: 'mailto:ayo.daniel.adesanya@gmail.com?subject=Facebook Clone - Bug Report',
  },
  {
    id: 1,
    name: 'Project Git Hub Repo',
    image: '/images/github.png',
    link: 'https://github.com/AyoCodess/Facebook-Clone-Functional-NextJs-Firebase-Tailwind-Typescript',
  },
  {
    id: 2,
    name: "Ayo's Linkedin",
    image: '/images/linkedin.png',
    link: 'https://www.linkedin.com/in/ayoadesanya/',
  },
  {
    id: 3,
    name: "Ayo's Portfolio",
    image: '/images/ayo.jpeg',
    link: 'https://www.ayoadesanya.com/',
  },
  {
    id: 4,
    name: 'Stop Holding Back Foundation',
    image: 'https://i.imgur.com/FRIs3ds.png?1',
    link: 'https://www.stopholdingback.org/',
  },
  {
    id: 5,
    name: 'Greenpeace',
    image: '/images/greenpeace.jpeg',
    link: 'https://www.greenpeace.org/',
  },
  {
    id: 6,
    name: "'Equity' Diversity & Inclusion",
    image: '/images/equity.png',
    link: 'https://ideal.com/diversity-equity-inclusion/',
  },
  {
    id: 7,
    name: 'Village Mindedness',
    image: '/images/vill.webp',
    link: 'https://www.ic.org/takes-village-organize-mind/',
  },
];
export const SidebarYourShortcuts = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className='hidden sm:block '>
        <SidebarTwoHeading title={'Your Shortcuts'} />
        <ul className='mt-2'>
          {shortcuts.map((shortcut) => (
            <a
              key={shortcut.id}
              href={shortcut.link}
              target='_blank'
              rel='noopener noreferrer'>
              <li
                className={`flex items-center gap-2 p-3 rounded-xl  cursor-pointer ${
                  !theme
                    ? ' themeLight hover:bg-gray-100 bg-transparent'
                    : 'themeDark bg-slate-800 hover:bg-blue-500'
                }`}>
                <img
                  className='h-12 w-12 rounded-lg object-cover'
                  src={shortcut!.image}
                  alt='shortcut icon'
                />
                <div className='ml-3'>
                  <p
                    className={`text-xl font-medium p-2 ${
                      !theme
                        ? 'themeLight  text-gray-900 bg-transparent '
                        : 'themeDark text-white bg-transparent'
                    }`}>
                    {shortcut!.name}
                  </p>
                </div>
              </li>
            </a>
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
