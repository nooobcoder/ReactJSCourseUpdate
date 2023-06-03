import {
	createImageUrlBuilder,
	createCurrentUserHook,
	createClient,
} from "next-sanity";

// Code Source: https://github.com/sanity-io/next-sanity#:~:text=//%20lib/config.js,env.NODE_ENV%20%3D%3D%3D%20%27production%27%2C%0A%7D
// lib/config.js
export const config = {
	/**
	 * Find your project ID and dataset in `sanity.json` in your studio project.
	 * These are considered “public”, but you can use environment variables
	 * if you want differ between local dev and production.
	 *
	 * https://nextjs.org/docs/basic-features/environment-variables
	 **/
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2021-10-21", // Learn more: https://www.sanity.io/docs/api-versioning
	/**
	 * Set useCdn to `false` if your application require the freshest possible
	 * data always (potentially slightly slower and a bit more expensive).
	 * Authenticated request (like preview) will always bypass the CDN
	 **/
	useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);
/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
// Code Source: https://github.com/sanity-io/next-sanity#:~:text=export%20const%20urlFor%20%3D%20(source)%20%3D%3E%20createImageUrlBuilder(config).image(source)
export const urlFor = (source) => createImageUrlBuilder(config).image(source);
