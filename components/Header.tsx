import Image from 'next/image';
import React from 'react';

export const Header = () => {
  return (
    <div>
      {/* Left */}
      <div>
        <Image
          src='/noWords.png'
          width={40}
          height={40}
          alt='logo'
          layout='fixed'
        />
      </div>
      {/*Center */}
      <div></div>
      {/*Right */}
      <div></div>
    </div>
  );
};
