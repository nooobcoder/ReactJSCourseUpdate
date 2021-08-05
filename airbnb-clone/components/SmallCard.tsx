import React, { FC } from 'react';
import { ApiResponseType } from '../pages';
import Image from 'next/image';

const SmallCard: FC<ApiResponseType> = ({ location, distance, img }: ApiResponseType) => (
  <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-200 ease-out">
    <div className="relative h-16 w-16">
      <Image src={img!} layout="fill" className="rounded-lg" />
    </div>

    <div>
      <h2>{location}</h2>
      <h3>{distance}</h3>
    </div>
  </div>
);

export default SmallCard;
