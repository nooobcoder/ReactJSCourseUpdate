import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Main from '../components/Main';

export type ApiResponseType = {
  img: string;
  location: string;
  distance: string;
};
export interface ExploreType {
  exploreData: Array<ApiResponseType>;
}

const Home: FC<ExploreType> = ({ exploreData }) => {
  return (
    <div className="font-cereal">
      <Head>
        <title>Airbnb clone - Ankur Paul</title>
        <meta name="description" content="Airbnb clone by Ankur Paul" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <Main exploreData={exploreData} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ExploreType> = async (): Promise<any> => {
  try {
    const exploreData: ExploreType = (await (
      await fetch(`https://jsonkeeper.com/b/4G1G`)
    ).json()) as ExploreType;
    return { props: { exploreData } };
  } catch (error) {
    console.log('Error fetching API!');
  }

  return { props: { exploreData: [] } };
};

export default Home;
