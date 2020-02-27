import React from 'react';
import Head from 'next/head';
import { AppLayout } from '../components/AppLayout';
import PropTypes from 'prop-types';

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.css" />
        <title>NodeBird</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  )
};

NodeBird.propTypes = {
  Component: PropTypes.elementType
}


export default NodeBird;