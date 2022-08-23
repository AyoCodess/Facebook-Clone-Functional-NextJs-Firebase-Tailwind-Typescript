import type { NextPage } from 'next';

import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';
import {
  Header,
  Sidebar,
  Feed,
  Toast,
  SidebarTwo,
  MobileHeaderBottom,
  MobileHeaderTop,
  InputboxModal,
} from '../components';
import { useSession } from 'next-auth/react';
import { Footer } from '../components/Footer';

interface Props {
  session: any;
}

const Home: NextPage<Props> = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setShow, show } = useContext(DataContext);

  const { data: session } = useSession();

  // - removes search field error toast
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <>
      <div className={` h-screen   ${!theme ? 'themeLight ' : 'themeDark '} `}>
        <Head>
          <title>Meta Space</title>
          <link rel='icon' href='/favicon.ico' />
          {/* <!-- * META TAGS FOR SOCIAL MEDIA * --> */}
          <meta property='og:title' content='Metaspace' />
          <meta
            property='og:description'
            content='The Decentralized Social Space'
          />
          <meta name='description' content='The Decentralized Social Space' />
          <meta property='og:image' content='https://i.imgur.com/7iee3YZ.png' />
          <meta property='og:url' content='https://coincora-blog.vercel.app/' />
          <meta
            property='og:site_name'
            content='Ayo Codes - Portfolio Website'
          />
          <meta property='og:locale' content='en_GB' />
          <meta property='og:type' content='website' />
          <meta
            name='twitter:image'
            content='https://i.imgur.com/7iee3YZ.png'
          />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Metaspace' />
          <meta
            name='twitter:description'
            content='The Decentralized Social Space'
          />
          <meta name='twitter:site' content='@ayo__codes' />
          <meta name='twitter:creator' content='@ayo__codes' />
          {/* <!-- * META TAGS FOR SOCIAL MEDIA ENDS * -->*/}
        </Head>
        <Toast />
        <InputboxModal />
        <Header />
        <MobileHeaderTop />
        <main
          className={`sm:flex   ${
            !theme ? 'lightTheme bg-gray-100' : ' darkTheme bg-slate-900'
          }`}>
          {/*Ipad and larger screens App */}
          <Sidebar />
          <Feed />
          <SidebarTwo />
          {/*Mobile App */}
          <MobileHeaderBottom />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
