/* PACKAGE IMPORTS */
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import { UsersIcon } from '@heroicons/react/solid';
// Styled imports for react-date-range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

/* --------------- */

const Header: FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  enum DatePickerKeys {
    selection = 'selection',
  }
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: DatePickerKeys.selection,
  });

  const handleSelect = (ranges: any) => {
    setDateRange((prevState) => ({
      ...prevState,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    }));
  };
  const selectionRange: Range = { ...dateRange };

  return (
    <header className="relative top-0 z-30 grid grid-cols-3 shadow-xl py-5 px-5 md:px-10 mx-5 rounded-2xl ">
      <div className="relative flex items-center h-10 cursor-pointer my-auto ">
        <Image src="/logo.png" layout="fill" objectFit="contain" objectPosition="left" alt="logo" />
      </div>

      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-md bg-gray-100">
        <input
          type="text"
          placeholder="Start your search"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(event.target.value)
          }
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

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-2 drop-shadow-xl ">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4 mt-3">
            <h2 className="text-2xl flex-grow font-semibold ">Number of Guests</h2>
            <UsersIcon className="h-5" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
