import type { NextPage } from "next";
import { useEffect } from "react";
import { sanityClient } from "../sanity";
import Link from "next/link";
import { isMultiple } from "../utils";
import { urlFor } from "../sanity";
import DashboardMap from "../components/DashboardMap";

interface PropTypes {
  properties: any;
}

const Home: NextPage<PropTypes> = ({ properties, ...children }) => {
  useEffect(() => {
    console.log(properties);
  }, []);
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="feed">
              {properties.map((property: any) => (
                <Link href={`property/${property.slug.current}`}>
                  <div key={property._id} className="card">
                    <img src={urlFor(property.mainImage).toString()} />
                    <p>
                      {property.reviews.length} review
                      {isMultiple(property.reviews.length)}
                    </p>
                    <h3>{property.title}</h3>
                    <h3>
                      <b>£{property.pricePerNight}/per Night</b>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="map">
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "property"]';
  try {
    const properties = await sanityClient.fetch(query);
    return !properties.length
      ? { props: { properties: [] } }
      : { props: { properties } };
  } catch (error) {}
};

export default Home;
