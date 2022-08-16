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
    <div className='grid place-content-center bg-metaBlack h-screen'>
      <div>
        <Image src='/images/withWords.png' width={400} height={400} />
      </div>
      {providers &&
        Object.values(providers).map((provider) => (
          <div
            className='grid place-content-center'
            key={provider.name}
            style={{ marginBottom: 0 }}>
            <button
              className='p-5 bg-blue-500 text-white rounded-full'
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: `${window.location.origin}/`,
                })
              }>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
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
