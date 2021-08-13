import Head from 'next/head';
import Header from '../components/Header';
import image from '../public/image.jpg';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="font-ember">
      <Head>
        <title>Amazon Clone</title>
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto"></main>
    </div>
  );
};

export default Home;
