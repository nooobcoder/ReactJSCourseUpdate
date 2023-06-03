import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { session, signIn, signOut, useSession } from 'next-auth/client';

const Header = () => {
  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="flex mt-2 items-center flex-grow sm:flex-grow-0">
          <Image
            src={'http://pngimg.com/uploads/amazon/amazon_PNG11.png'}
            width={150}
            height={40}
            placeholder="blur"
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAJYAAAAoCAQAAAC2yMtsAAAATklEQVR42u3QMQEAAAwCoNm/9Cr4+UAEctSiQJYsWbJkyVIgS5YsWbJkKZAlS5YsWbIUyJIlS5YsWQpkyZIlS5YsBbJkyZIlS5YCWbLWHvNZACkvUXnjAAAAAElFTkSuQmCC"
            objectFit={'contain'}
            className={'cursor-pointer'}
          />
        </div>

        <div className="bg-yellow-400 hover:bg-yellow-500 sm:flex hidden rounded-md items-center ht-10 flex-grow cursor-pointer ">
          <input
            type="text"
            className="p-4 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        <div className="text-white flex items-center  text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link ">
            <img
              alt="india-flag"
              className="inline rounded-sm h-6"
              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/IN.svg"
            />
          </div>
          <div onClick={() => signIn()} className=" link">
            <p>Hello, Ankur Paul</p>
            <p className="font-extrabold md:text-sm">Account &amp; Lists</p>
          </div>
          <div className=" link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">&amp; Orders</p>
          </div>
          <div className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-6 z-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-extrabold">
              {1}
            </span>
            <ShoppingCartIcon className="h-7 " />
            <p className="hidden md:inline font-extrabold md:text-sm mt-4">Cart</p>
          </div>
        </div>
      </div>
      <div className="font-ember-italic flex items-center space-x-3 p-2 pl-5 bg-amazon_blue-light text-white text-sm">
        <p className="flex link items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food &amp; Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health &amp; Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
