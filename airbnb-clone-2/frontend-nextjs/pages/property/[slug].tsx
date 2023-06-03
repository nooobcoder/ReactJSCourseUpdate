import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { sanityClient } from "../../sanity";
import { isMultiple } from "../../utils";
import Image from "../../components/Image";
import Map from "../../components/Map";
import Review from "../../components/Review";
export interface Property {
  bedrooms: number;
  beds: number;
  description: string;
  host: Host;
  images: ImagesEntity[];
  location: Location;
  mainImage: ImageOrMainImage;
  pricePerNight: number;
  propertyType: string;
  reviews?: ReviewsEntity[];
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
  const reviewAmount = reviews?.length;
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <p>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={mainImage} />
        <div className="sub-images-section">
          {images.map(({ _key, asset }, image) => (
            <Image key={_key} identifier="image" image={asset} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="information">
          <h2>
            <b>
              {propertyType} hosted by {host?.name}
            </b>
          </h2>
          <h4>
            {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed
            {isMultiple(beds)}
          </h4>
          <hr />
          <h4>
            <b>Enhanced Clean</b>
          </h4>
          <p>
            This host is committed to Airbnb's 5-step enhanced cleaning process.
          </p>
          <h4>
            <b>Amenities for everyday living</b>
          </h4>
          <p>
            The host has equipped this place for long stays - kitchen, shampoo,
            conditioner, hairdryer included.
          </p>
          <h4>
            <b>House rules</b>
          </h4>
          <p>
            This place isn't suitable for pets andthe host does not allow
            parties or smoking.
          </p>
        </div>
        <div className="price-box">
          <h2>£{pricePerNight}</h2>
          <h4>
            {reviewAmount} review{isMultiple(reviewAmount)}
          </h4>
          <Link href="/">
            <div className="button">Change Dates</div>
          </Link>
        </div>
      </div>

      <hr />

      <h4>{description}</h4>

      <hr />

      <h2>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </h2>
      {reviewAmount! > 0 &&
        reviews?.map((review) => <Review key={review._key} review={review} />)}

      <hr />

      <h2>Location</h2>
      <Map location={location}></Map>
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
