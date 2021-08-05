/* PACKAGE IMPORTS */
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React, { FC } from 'react';
/* --------------- */

const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 shadow-xl py-5 px-5 md:px-10 mx-5 rounded-2xl ">
      <div className="relative flex items-center h-10 cursor-pointer my-auto ">
        <Image src="/logo.png" layout="fill" objectFit="contain" objectPosition="left" />
      </div>

      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-md bg-gray-100">
        <input
          type="text"
          placeholder="Start your search"
          className="overflow-auto	 pl-5 bg-transparent flex-grow text-sm text-gray-600 placeholder-gray-300 outline-none"
        />
        <SearchIcon className="hidden h-8 md:inline-flex  bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      <div className="flex items-center space-x-4 justify-end text-gray-500 font-extralight	">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full ">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
