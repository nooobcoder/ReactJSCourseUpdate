import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
	const { productId } = useParams();
	console.log(productId);
	return (
		<section>
			<h1>{productId}</h1>
		</section>
	);
};

export default ProductDetail;
