import { signIn, getProviders } from 'next-auth/react';

const login = ({ providers }: any) => {
  console.log('providers', providers);
  return (
    <div>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name} style={{ marginBottom: 0 }}>
            <button
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

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
