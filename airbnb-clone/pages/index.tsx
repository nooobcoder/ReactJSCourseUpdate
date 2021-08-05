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
export type MediumCardsType = {
  img: string;
  title: string;
};
export interface ExploreType {
  exploreData: Array<ApiResponseType>;
  cardsData: Array<MediumCardsType>;
}

const Home: FC<ExploreType> = ({ exploreData, cardsData }) => {
  return (
    <div className="font-cereal">
      <Head>
        <title>Airbnb clone - Ankur Paul</title>
        <meta name="description" content="Airbnb clone by Ankur Paul" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <Main exploreData={exploreData} cardsData={cardsData} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ExploreType> = async (): Promise<any> => {
  try {
    const exploreData: ExploreType = (await (
      await fetch(`https://jsonkeeper.com/b/4G1G`)
    ).json()) as ExploreType;

    const cardsData: ExploreType = (await await (
      await fetch(`https://jsonkeeper.com/b/VHHT`)
    ).json()) as ExploreType;

    return { props: { exploreData, cardsData } };
  } catch (error) {
    console.log('Error fetching API!');
  }

  return { props: { exploreData: [] } };
};

export default Home;
