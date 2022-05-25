import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";

import Feed from "../components/Feed";
import Postbox from "../components/Postbox";
import SubredditRow from "../components/SubredditRow";
import { GET_SUBREDDITS_WITH_LIMIT } from "../graphql/queries";

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: { limit: 10 },
  });
  const subreddits: Subreddit[] = data?.getSubredditListWithLimit;
  console.log(data, subreddits);

  return (
    // Tailwind space around
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit 2.0 - nooobcoder</title>
      </Head>
      <Postbox />
      <div className="flex">
        <Feed />
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>
            {subreddits?.map((subreddit, index) => (
              <SubredditRow
                key={subreddit.id}
                topic={subreddit.topic}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
