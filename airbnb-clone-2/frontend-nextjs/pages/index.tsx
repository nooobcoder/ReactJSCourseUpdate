import type { NextPage } from "next";
import { useEffect } from "react";
import { sanityClient } from "../sanity";
interface PropTypes {
  properties: any;
}

const Home: NextPage<PropTypes> = ({ properties, ...children }) => {
  useEffect(() => {
    console.log(properties);
  }, []);
  return <>Hello</>;
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
