import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

import carousel_1 from '../public/images/carousel_1.jpg';
import carousel_2 from '../public/images/carousel_2.jpg';
import carousel_3 from '../public/images/carousel_3.jpg';

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-30 bg-gradient-to-t from-gray-400 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        useKeyboardArrows={false}
        autoFocus={false}
        thumbWidth={120}
        infiniteLoop
        showArrows={true}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image src={carousel_1} />
        </div>
        <div>
          <Image src={carousel_2} />
        </div>
        <div>
          <Image src={carousel_3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
