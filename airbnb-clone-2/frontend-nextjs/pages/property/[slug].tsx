import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { sanityClient } from "../../sanity";

export interface Property {
  bedrooms: number;
  beds: number;
  description: string;
  host: Host;
  images?: ImagesEntity[] | null;
  location: Location;
  mainImage: ImageOrMainImage;
  pricePerNight: number;
  propertyType: string;
  reviews?: ReviewsEntity[] | null;
  title: string;
}
export interface Host {
  _id: string;
  image?: null;
  name: string;
  slug: Slug;
}
export interface Slug {
  _type: string;
  current: string;
}
export interface ImagesEntity {
  _key: string;
  _type: string;
  asset: Asset;
}
export interface Asset {
  _ref: string;
  _type: string;
}
export interface Location {
  _type: string;
  alt: number;
  lat: number;
  lng: number;
}
export interface ImageOrMainImage {
  _type: string;
  asset: Asset;
}
export interface ReviewsEntity {
  _key: string;
  _type: string;
  rating: string;
  reviewDescription: string;
  traveller: Traveller;
}
export interface Traveller {
  _id: string;
  image: ImageOrMainImage;
  name: string;
  slug: Slug;
}

// Client side code
export const Property = ({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews,
}: Property) => {
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <h2>
        <b>
          {propertyType} hosted by {host && host.name}
        </b>
      </h2>
      <h4>
        {bedrooms} bedroom * {beds} bed
      </h4>
    </div>
  );
};

// Server side code
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const pageSlug = context.query.slug!;

  const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveller->{
        _id,
        name,
        slug,
        image
      }
    }
  }`;

  const property = await sanityClient.fetch(query, { pageSlug });
  console.log(property);
  return property
    ? {
        props: { ...property },
      }
    : { props: null, notFound: true };
};

export default Property;
