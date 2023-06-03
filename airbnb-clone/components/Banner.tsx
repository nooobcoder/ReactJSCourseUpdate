import Image from 'next/image';
import { FC } from 'react';

const Banner: FC = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] font-semibold">
      <Image src="/banner-bg.webp" layout="fill" objectFit="cover" alt="banner-img" />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
        <button className="bg-white text-[#ff5a5f] px-10 py-4 rounded-full font-bold shadow-lg my-3 hover:shadow-xl active:scale-90 transition duration-150">
          I&apos;m flexible
        </button>
      </div>
    </div>
  );
};

export default Banner;
