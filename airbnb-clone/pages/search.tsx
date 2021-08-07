import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { FC } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

const filterTexts: Array<string> = [
  'Cancellation Flexibility',
  'Type of Place',
  'Price',
  'Rooms and Beds',
  'More Filters',
];

export interface HotelSearchAPIParams {
  img: string;
  location: string;
  title: string;
  description: string;
  price: string;
  total: string;
  star: number;
  long: number;
  lat: number;
}

export interface HotelPropsType {
  searchResults: Array<HotelSearchAPIParams>;
}

const Search: FC<HotelPropsType> = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const { fmtStartDate, fmtEndDate } = {
    fmtStartDate: format(new Date(startDate as string), 'dd MMMM yy'),
    fmtEndDate: format(new Date(endDate as string), 'dd MMMM yy'),
  };
  const range = `${fmtStartDate} - ${fmtEndDate}`;

  return (
    <>
      <Header searchPlaceholder={`${location} | ${range} | ${noOfGuests} guest(s)`} />
      <main className="flex">
        <section className="flex-grow pt-4 px-6">
          <p className="text-xs">
            300+ stays - {range} - for {noOfGuests} guest(s)
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            {filterTexts.map((filterItem) => (
              <p className="button" key={nanoid(4)}>
                {filterItem}
              </p>
            ))}
          </div>
          <div className="flex flex-col">
            {searchResults.map((resultItem: HotelSearchAPIParams) => (
              <InfoCard key={nanoid(4)} {...resultItem} />
            ))}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HotelSearchAPIParams> =
  async (): Promise<any> => {
    const searchResults = await await (await fetch(`https://jsonkeeper.com/b/5NPS`)).json();

    return { props: { searchResults } };
  };

export default Search;
