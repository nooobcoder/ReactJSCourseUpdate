import { Link } from "react-router-dom";

const Products = () => {
	return (
		<section>
			<h1>The Products Page</h1>
			<ul>
				<Link to="/product-detail/NestleMunch">Nestle Munch</Link>
				<br />
				<Link to="/product-detail/NestleMaggi">Nestle Maggi</Link>
				<br />
				<Link to="/product-detail/RedHit">Red Hit</Link>
				<br />
			</ul>
		</section>
	);
};

export default Products;
