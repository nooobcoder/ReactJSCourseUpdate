import Layout from '@/components/Layout';
import Grid from '@/components/Grid';

import homes from 'data.json';
import { getAllHomes } from '../utils/dbOps.ts';

export default function Home({ homes: h }) {
  console.log(h)
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">
        Top-rated places to stay
      </h1>
      <p className="text-gray-500">
        Explore some of the best places in the world
      </p>
      <div className="mt-8">
        <Grid homes={homes} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const homes = await getAllHomes();
  console.log(homes)
  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
  };
}
