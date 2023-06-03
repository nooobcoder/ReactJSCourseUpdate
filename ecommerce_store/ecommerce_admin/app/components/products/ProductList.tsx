import Image from "next/image";
import type { ProductType } from "./ProductsList";

const getProductById = async (productId: string): Promise<ProductType> => {
	const res = await fetch(
		`${process.env.NEXTAUTH_URL}/api/product?id=${productId}`,
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
		const products = (await res.json()) as ProductType;
		console.log(products);
		return products;
	} else {
		return {} as ProductType;
	}
};

const ProductCard = async ({ productId }: { productId: string }) => {
	const product = await getProductById(productId);
	const { name, description, price } = product;

	// Assuming you have an API endpoint to fetch the image based on the ID
	const imageUrl = `https://picsum.photos/1024/768`;

	return (
		<div className="flex flex-col items-center p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
			<div className="">
				<Image
					src={imageUrl}
					alt="Product Image"
					width={400}
					height={350}
					className="rounded-lg"
				/>
			</div>
			<div>
				<h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
					{name}
				</h2>
				<p className="mb-4 text-gray-600 dark:text-gray-400">{description}</p>
			</div>
			<div className="mb-4 text-4xl font-bold text-indigo-500 dark:text-indigo-400">
				&#8377; {price}
			</div>
		</div>
	);
};

export default ProductCard;
