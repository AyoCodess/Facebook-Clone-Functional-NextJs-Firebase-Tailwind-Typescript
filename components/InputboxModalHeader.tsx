import React from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preSendPost: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const InputboxModalHeader = ({
  Icon,
  setModalOpen,
  preSendPost,
}: Props) => {
  const { data: session } = useSession();
  return (
    <div className={`flex justify-between items-center cursor-pointer `}>
      {/*banner */}
      <Icon
        className='h-6 hover:text-gray-500'
        onClick={() => setModalOpen(false)}
      />
      <p className='text-sm'>Create post</p>
      <button
        disabled={!session}
        onClick={(e) => {
          preSendPost(e);
          setModalOpen(false);
        }}
        className='px-2 py-1 bg-blue-500 font-medium hover:bg-blue-400 text-white text-sm rounded-md'>
        Post
      </button>
    </div>
  );
};
