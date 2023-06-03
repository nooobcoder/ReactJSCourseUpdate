import mongoose from "mongoose";
import Link from "next/link";

export interface ProductType extends mongoose.Document {
	name: string;
	description: string;
	price: number;
}

const getAllProducts = async (): Promise<Array<ProductType>> => {
	try {
		const res = await fetch(
			`${process.env.NEXTAUTH_URL}/api/product/allProducts`,
			{
				method: "GET",
				cache: "no-cache",
				// next: {
				// 	// Revalidate every 5 seconds 🕔
				// 	revalidate: 5,
				// },
			}
		);
		if (res.status === 200) {
			const products = (await res.json()) as Array<ProductType>;

			return products;
		} else {
			return [];
		}
	} catch (err) {
		console.error(err);
		return [];
	}
};

export default async function ProductsList() {
	const products = await getAllProducts();

	return (
		<div className="flex flex-wrap">
			{products.map((product) => (
				<div
					key={product._id}
					className="flex flex-col justify-between w-64 p-4 m-4 text-white bg-gray-800 rounded-lg"
				>
					<h2 className="mb-2 text-2xl">{product.name}</h2>
					<p className="mb-2">{product.description}</p>
					<p className="font-bold">₹ {product.price}</p>
					<Link href={`/products/${product._id}`}>
						<button className="w-full button-pink">Edit 📝</button>
					</Link>
				</div>
			))}
		</div>
	);
}
