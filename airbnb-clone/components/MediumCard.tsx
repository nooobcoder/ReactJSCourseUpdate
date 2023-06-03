import React, { FC } from 'react';
import { MediumCardsType } from '../pages';
import Image from 'next/image';

const MediumCard: FC<MediumCardsType> = ({ img, title }: MediumCardsType) => (
  <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
    <div className="relative h-80 w-80">
      <Image src={img} layout="fill" className="rounded-xl" />
    </div>
    <h3 className="text-2xl mt-3">{title}</h3>
  </div>
);
export default MediumCard;
