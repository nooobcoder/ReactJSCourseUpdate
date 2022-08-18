import '@/styles/global.css';
import { ChakraProvider } from '@chakra-ui/react';
import { LRAuthProvider } from 'loginradius-react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from './components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Loginradius Next</title>
      </Head>

      <LRAuthProvider
        appName="nextloginradius"
        apiKey="24a817b4-57e3-4967-a7a5-1326fed6a11a"
        redirectUri={`http://127.0.0.1:3000/`}
      >
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </LRAuthProvider>
    </>
  );
}
