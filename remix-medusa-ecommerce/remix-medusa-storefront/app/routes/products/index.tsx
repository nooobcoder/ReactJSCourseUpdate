import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductCard from "~/components/product-card";

import { createMedusaClient } from "~/utils/client.server";

type Variant = {
	prices: [
		{
			amount: number;
			currency_code: string;
		}
	];
};

type Product = {
	id: string;
	title: string;
	variants: Variant[];
	thumbnail: string;
};

type Products = {
	products: Array<Product>;
};

const loader: LoaderFunction = async () => {
	const client = createMedusaClient();
	const { products } = await client.products.list();

	return json({ products }, { status: 200, statusText: "Fetch Successful" });
};

function ProductsIndexRoute() {
	const { products } = useLoaderData<Products>();
	return (
		<div className="w-full p-4 my-8">
			<h1 className="text-center">Latest Arrivals</h1>
			<div className="grid grid-cols-1 gap-6 px-4 mt-8 md:px-12 lg:px-6 xl:px-4 xl:gap-6 2xl:px-24 2xl:gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default ProductsIndexRoute;
export { loader };
