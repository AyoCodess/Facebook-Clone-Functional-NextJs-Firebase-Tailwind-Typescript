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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      <div className={` h-screen ${!theme ? 'themeLight ' : 'themeDark '}  `}>
        <Head>
          <title>Leave Your Mark! - Share your moments</title>
          <link rel='icon' href='/images/noWords.png' />
          {/* <!-- * META TAGS FOR SOCIAL MEDIA * --> */}
          <meta
            property='og:title'
            content='Leave Your Mark - Share your moments'
          />
          <meta
            property='og:description'
            content='Leave Your Mark - Share your moments'
          />
          <meta
            name='description'
            content='Leave Your Mark - Share your moments'
          />
          <meta property='og:image' content='https://i.imgur.com/OWYUr7a.png' />
          <meta property='og:url' content='https://leaveyourmark.vercel.app/' />
          <meta
            property='og:site_name'
            content='Leave Your Mark - Share your moments'
          />
          <meta property='og:locale' content='en_GB' />
          <meta property='og:type' content='website' />
          <meta
            name='twitter:image'
            content='https://i.imgur.com/OWYUr7a.png'
          />
          <meta name='twitter:card' content='summary_large_image' />
          <meta
            name='twitter:title'
            content='leave your mark - Share your moments'
          />
          <meta name='twitter:description' content='social posting board' />
          <meta name='twitter:site' content='@ayo__codes' />
          <meta name='twitter:creator' content='@ayo__codes' />
          {/* <!-- * META TAGS FOR SOCIAL MEDIA ENDS * -->*/}
        </Head>
        <Toast />
        <InputboxModal />
        <Header />
        <MobileHeaderTop />
        <main
          className={` relative sm:flex   ${
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
