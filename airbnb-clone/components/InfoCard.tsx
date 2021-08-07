import React, { FC } from 'react';
import { HotelSearchAPIParams } from '../pages/search';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/outline';

const InfoCard: FC<HotelSearchAPIParams> = ({
  description,
  img,
  lat,
  location,
  long,
  price,
  star,
  title,
  total,
}) => {
  return (
    <div className="flex py-7 px-5 pr-4 border-b cursor-pointer hover:bg-red-100 rounded-lg hover:opacity-100 opacity-90 hover:shadow-lg transition duration-200 ease-in first:border-t filter grayscale hover:filter-none">
      <div className="relative h-52 w-40 md:w-80 flex-shrink-0">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          alt="result-image"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>

          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
