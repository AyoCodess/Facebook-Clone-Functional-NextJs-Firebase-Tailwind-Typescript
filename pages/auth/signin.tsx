import { signIn, getProviders } from 'next-auth/react';

const SignIn = ({ providers }: any) => (
  <div>
    {providers &&
      Object.values(providers).map((provider) => (
        <div key={provider.name} style={{ marginBottom: 0 }}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}

    {!providers && <p>Loading...</p>}
  </div>
);

export default signIn;

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders();

  console.log('providers:', providers);
  return {
    props: {
      providers,
    },
  };
};
