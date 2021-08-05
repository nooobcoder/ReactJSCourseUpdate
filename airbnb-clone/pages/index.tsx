import Head from 'next/head';
import { FC } from 'react';
import Header from '../components/Header';

const Home: FC = () => {
  return (
    <div className="">
      <Head>
        <title>Airbnb clone - Ankur Paul</title>
        <meta name="description" content="Airbnb clone by Ankur Paul" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {/* Banner */}
    </div>
  );
};

export default Home;
