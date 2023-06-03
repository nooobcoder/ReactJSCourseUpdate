import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';

export type ProductsResponse = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
export interface Props {
  products: Array<ProductsResponse>;
}

const Home = ({ products }: Props) => {
  return (
    <div className="font-ember bg-gray-100 ">
      <Head>
        <title>Amazon Clone</title>
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async context => {
  const REST_ENDPOINT = `https://fakestoreapi.com/products`;
  const result = await await (await fetch(REST_ENDPOINT, { method: 'GET' })).json();

  return { props: { products: result } };
};

export { getServerSideProps };
export default Home;
