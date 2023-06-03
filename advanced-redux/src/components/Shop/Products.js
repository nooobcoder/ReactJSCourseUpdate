import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { fetchItemStore } from "../../store/cartActions";

const DUMMY_PRODUCTS = [
	{
		id: "p1",
		price: 6,
		title: "My First Book",
		description: "The first book I ever wrote",
	},
	{
		id: "p2",
		price: 5,
		title: "My Second Book",
		description: "The second book I ever wrote",
	},
	{
		id: "p3",
		price: 23,
		title: "My Third Book",
		description: "The third book I ever wrote",
	},
];

const Products = (props) => {
	let { itemStore } = useSelector((state) => state.cart);
	if (itemStore === undefined || null) itemStore = DUMMY_PRODUCTS;
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{itemStore.map(({ id, title, price, description }) => (
					<ProductItem
						key={id}
						id={id}
						title={title}
						price={price}
						description={description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
