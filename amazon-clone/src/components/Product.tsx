import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import { ProductsResponse } from '../pages';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';

const [MAX_RATING, MIN_RATING] = [5, 1];
const Product = ({ category, description, id, image, price, title }: ProductsResponse) => {
  const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs text-gray-400 font-ember-italic italic capitalize">
        {category}
      </p>
      <Image
        height={200}
        width={200}
        src={image}
        objectFit="contain"
        placeholder="blur"
        blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAGQAAAAKCAYAAABCHPt+AAAAK0lEQVR42u3RAQ0AAAQAMOLLp4Mcatj8FZ5T0cEZKUQIQoQgRAhChCDktwXAlRafzMh42wAAAABJRU5ErkJggg=="
      />

      <h4 className="my-3 ">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill(1)
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5 ">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12 "
            src="https://lh3.googleusercontent.com/proxy/J8LEEA8u12qkP-7meCNqnXdbqStPjAOFkLf6rEVgwacH1EsS9jOASETwvsLJGPGp16e0Qoq9BIXrEAxKcxso8kGdhwyXCkaQlCVg3DjXvLhaMXE2dJxVyZlMiNT5cGE1gFi58YjKey9Pl-mN9iSrvKTynsY"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="button mt-auto">Add to Cart</button>
    </div>
  );
};

export default Product;
