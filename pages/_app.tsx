import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../ThemeContext';
import { DataProvider } from '../DataContext';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ThemeProvider>
      <DataProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default MyApp;
