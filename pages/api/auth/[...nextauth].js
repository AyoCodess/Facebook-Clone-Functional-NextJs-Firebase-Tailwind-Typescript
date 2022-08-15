import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/signout',
    error: '/error', // Error code passed in query string as ?error=
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
