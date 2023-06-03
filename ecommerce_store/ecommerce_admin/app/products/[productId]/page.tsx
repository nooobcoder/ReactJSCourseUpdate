import ProductCard from "@/app/components/products/ProductList";
type Params = {
	params: {
		productId: string;
	};
};

const ProductPage = ({ params }: Params) => {
	const { productId } = params;

	/* Products list */
	/* @ts-expect-error Async Server Component */
	return <ProductCard productId={productId} />;
};
export default ProductPage;
