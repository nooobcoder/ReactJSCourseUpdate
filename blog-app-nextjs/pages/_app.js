import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

import React from 'react';

import { Layout } from './components';

function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>;
}

export default MyApp;
