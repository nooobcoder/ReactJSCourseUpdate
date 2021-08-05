import React, { FC } from 'react';
import { ApiResponseType, ExploreType } from '../pages';
import SmallCard from './SmallCard';
import { nanoid } from 'nanoid';

const Main: FC<ExploreType> = ({ exploreData }: ExploreType) => {
  console.log(exploreData);
  return (
    <main className="font-bold max-w-7xl mx-auto px-8 sm:px-16">
      <section className="pt-6">
        <h2 className="text-3xl pb-5">Explore Nearby</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData &&
            exploreData.map((item: ApiResponseType) => <SmallCard {...item} key={nanoid(5)} />)}
        </div>
      </section>
    </main>
  );
};

export default Main;
