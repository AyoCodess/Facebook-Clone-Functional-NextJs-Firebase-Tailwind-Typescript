import React, { useContext } from 'react';
import { StoriesHeader, StoriesCard } from '../components';
import { ThemeContext } from '../Context';

const stories = [
  {
    name: 'Coincora',
    src: 'https://i.imgur.com/ixWtxQw.png',
    profile: 'https://i.imgur.com/NVT7gKL.png',
    active: true,
  },
  {
    name: 'Sustainable Development',
    src: 'https://i.imgur.com/BWxK40U.jpg',
    profile: 'https://i.imgur.com/a5Zj4hN.jpg',
    active: false,
  },
  {
    name: 'Family Life',
    src: 'https://i.imgur.com/WViIx6j.jpg',
    profile: 'https://i.imgur.com/QfZnD2p.png',
    active: false,
  },
  {
    name: 'Love and Relationships',
    src: 'https://i.imgur.com/gPnsz5T.jpg',
    profile: 'https://i.imgur.com/saBetIe.jpg',
    active: false,
  },
  {
    name: 'Fruity Loops',
    src: 'https://i.imgur.com/aGruPzj.jpg',
    profile: 'https://i.imgur.com/xX74WO4.jpg',
    active: false,
  },
];

export const Stories = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <StoriesHeader />
      <div
        className={`flex  justify-center gap-3 mx-auto p-4 ${
          !theme ? 'lightTheme bg-white rounded-lg' : 'darkTheme'
        }`}>
        {stories.map((story) => (
          <StoriesCard
            key={story.name}
            name={story.name}
            src={story.src}
            profile={story.profile}
            active={story.active}
          />
        ))}
      </div>
    </>
  );
};
