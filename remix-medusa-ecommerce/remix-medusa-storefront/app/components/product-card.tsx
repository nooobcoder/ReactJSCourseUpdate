import { Link } from "@remix-run/react";
import { formatPrice } from "~/utils/prices";

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

type FunctionProps = {
	product: Product;
};

export default function ProductCard({ product }: FunctionProps) {
	const variant = product.variants[0];

	return (
		<section className="overflow-hidden bg-white rounded-lg shadow:md hover:shadow-lg w-80">
			<Link to={`product/${product.id}`}>
				<img className="w-80" src={product.thumbnail} alt={product.title} />
				<div className="p-4">
					<h3 className="text-lg font-bold text-gray-700 hover:underline">
						{product.title}
					</h3>
					<p className="font-semibold text-teal-600">{formatPrice(variant)}</p>
				</div>
			</Link>
		</section>
	);
}
