import ProductsList from "@/app/components/products/ProductsList";
import Link from "next/link";

export default async function Products() {
	return (
		<div className="flex-grow p-4 mt-1 mb-0 mr-2 space-y-2 rounded-lg">
			<h1 className="text-2xl font-bold text-center ">Products</h1>
			<hr className="border-black rounded-full dark:border-gray-500 border-1" />
			{/* Add new product link */}
			<Link href={"/products/new"}>
				<button className="button-pink">Add New Product</button>
			</Link>
			{/* Products list */}
			{/* @ts-expect-error Async Server Component */}
			<ProductsList />
		</div>
	);
}
