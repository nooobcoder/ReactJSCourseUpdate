import Image from 'next/image';
import Layout from '@/components/Layout';
import { getAllHomes, getHomeById } from 'utils/dbOps.ts';
import { useRouter } from 'next/router';

const ListedHome = (home = null) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold truncate">
              {home?.title ?? ''}
            </h1>
            <ol className="inline-flex items-center space-x-1 text-gray-500">
              <li>
                <span>{home?.guests ?? 0} guests</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{home?.beds ?? 0} beds</span>
                <span aria-hidden="true"> · </span>
              </li>
              <li>
                <span>{home?.baths ?? 0} baths</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-6 relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-md overflow-hidden">
          {home?.image ? (
            <Image
              src={home.image}
              alt={home.title}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>

        <p className="mt-8 text-lg">{home?.description ?? ''}</p>
      </div>
    </Layout>
  );
};

const getStaticProps = async ({ params }) => {
  const home = await getHomeById(params.id);

  if (home) {
    return { props: JSON.parse(JSON.stringify(home)), revalidate: 10 };
  }
}

const getStaticPaths = async () => {
  const homes = await getAllHomes({ select: { id: true } });

  return {
    paths: homes.map(h => ({ params: { id: h.id } })),
    fallback: true,
  }
}

export default ListedHome;
export { getStaticPaths, getStaticProps }
