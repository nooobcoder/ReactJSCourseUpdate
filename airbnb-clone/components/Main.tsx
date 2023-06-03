import { nanoid } from 'nanoid';
import React, { FC } from 'react';
import { ApiResponseType, ExploreType, MediumCardsType } from '../pages';
import LargeCard from './LargeCard';
import MediumCard from './MediumCard';
import SmallCard from './SmallCard';

const Main: FC<ExploreType> = ({ exploreData, cardsData }: ExploreType) => {
  return (
    <main className="font-bold max-w-7xl mx-auto px-8 sm:px-16 mb-3">
      <section className="pt-6">
        <h2 className="text-3xl pb-5">Explore Nearby</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData &&
            exploreData.map((item: ApiResponseType) => <SmallCard {...item} key={nanoid(5)} />)}
        </div>
      </section>

      <section className="pt-6">
        <h2 className="text-3xl pb-5">Live Anywhere</h2>
        <div className="flex overflow-scroll space-x-3 scrollbar-hide p-3 -ml-3">
          {cardsData &&
            cardsData.map((item: MediumCardsType) => <MediumCard {...item} key={nanoid(5)} />)}
        </div>
      </section>

      <LargeCard
        img="https://a0.muscache.com/im/pictures/2da67c1c-0c61-4629-8798-1d4de1ac9291.jpg?im_w=1440"
        title="The Greatest Outdoors"
        description="Wishlists curated for you"
        buttonText="Get Inspired"
      />
    </main>
  );
};

export default Main;
