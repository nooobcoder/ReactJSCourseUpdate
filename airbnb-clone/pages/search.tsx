import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const filterTexts: Array<string> = [
  'Cancellation Flexibility',
  'Type of Place',
  'Price',
  'Rooms and Beds',
  'More Filters',
];

const Search = () => {
  return (
    <>
      <Header />
      <main className="flex">
        <section>
          <p className="text-xs">300+ stays for 5 number of guests</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in London</h1>

          <div className="hidden lg:inline-flex">
            {filterTexts.map((filterItem) => (
              <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 transform transition ease-out active:bg-gray-100" >{filterItem}</p>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Search;
