import React from 'react';
import ReactDom from 'react-dom';
import Link from 'next/link';
import { AppLayout } from '../components/AppLayout';
// import '../node_modules/antd/dist/antd.css';
// import 'antd/dist/antd.css';
import Head from 'next/head';

const Home = () => {
  console.log(123);
  console.log(`I'm just testing`);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.css" />
        <title>NodeBird</title>
      </Head>
      <AppLayout>
        <Link href="/profile"><a>Tinder Profile</a></Link>
      </AppLayout>
    </>
  );
};

export default Home;