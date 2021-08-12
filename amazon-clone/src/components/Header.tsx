import React from 'react';
import Image from 'next/image';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';

const Header = () => {
  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="flex mt-2 items-center flex-grow sm:flex-grow-0">
          <Image
            src={'http://pngimg.com/uploads/amazon/amazon_PNG11.png'}
            width={150}
            height={40}
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
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div>
            <p>Hello, Ankur Paul</p>
            <p>Account &amp; Lists</p>
          </div>
          <div>
            <p>Returns</p>
            <p>&amp; Orders</p>
          </div>
          <div>
            <ShoppingCartIcon className="h-7" />
            <p>Cart</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
