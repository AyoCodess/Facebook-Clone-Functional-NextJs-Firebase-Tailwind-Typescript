import React from 'react';
import { StoriesCard } from '../components';

const stories = [
  {
    name: 'Coincora',
    src: 'https://i.imgur.com/ixWtxQw.png',
    profile: 'https://i.imgur.com/NVT7gKL.png',
  },
  {
    name: 'Sustainable Development',
    src: 'https://i.imgur.com/BWxK40U.jpg',
    profile: 'https://i.imgur.com/a5Zj4hN.jpg',
  },
  {
    name: 'Family Life',
    src: 'https://i.imgur.com/WViIx6j.jpg',
    profile: 'https://i.imgur.com/QfZnD2p.png',
  },
  {
    name: 'Love and Relationships',
    src: 'https://i.imgur.com/gPnsz5T.jpg',
    profile: 'https://i.imgur.com/saBetIe.jpg',
  },
  {
    name: 'Fruity Loops',
    src: 'https://i.imgur.com/aGruPzj.jpg',
    profile: 'https://i.imgur.com/xX74WO4.jpg',
  },
];

export const Stories = () => {
  return (
    <div className='flex justify-center gap-3 mx-auto'>
      {stories.map((story) => (
        <StoriesCard
          key={story.name}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))}
    </div>
  );
};
