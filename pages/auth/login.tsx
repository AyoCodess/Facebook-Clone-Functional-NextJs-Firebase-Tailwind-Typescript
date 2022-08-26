import { signIn, getProviders } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

interface T {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callBackUrl: string;
}
interface Props {
  providers: Array<T>;
}

const login = ({ providers }: Props) => {
  console.log('providers', providers);
  return (
    <div className='grid place-content-center bg-white h-screen overflow-y-hidden'>
      <div>
        <Image
          src='/images/noWords.png'
          width={600}
          height={600}
          alt='app logo'
        />
      </div>
      {providers && (
        <div
          className='flex flex-col gap-2 mx-auto'
          style={{ marginBottom: 0 }}>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              className='p-5 w-60 bg-blu-500 text-white bg-black hover:bg-blue-500 transition duration-300 rounded-full'
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: `${window.location.origin}/`,
                })
              }>
              Sign in with {provider.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
