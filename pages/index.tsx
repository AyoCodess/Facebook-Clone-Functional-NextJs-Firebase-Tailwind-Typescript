import type { NextPage } from 'next';

import Head from 'next/head';
import React, { useContext } from 'react';
import { ThemeContext } from '../Context';
import { Header, Sidebar, Feed } from '../components';

interface Props {
  session: any;
}

const Home: NextPage<Props> = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div
      className={` h-screen  overflow-hidden transition duration-700 ${
        !theme ? 'bg-gray-100' : 'bg-black'
      } `}>
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
        <meta property='og:site_name' content='Ayo Codes - Portfolio Website' />
        <meta property='og:locale' content='en_GB' />
        <meta property='og:type' content='website' />
        <meta name='twitter:image' content='https://i.imgur.com/7iee3YZ.png' />
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
      <Header />
      <main className='flex'>
        <Sidebar />
        <Feed />
      </main>
    </div>
  );
};

export default Home;
