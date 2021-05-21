import styles from "../../styles/Cart/Cart.module.css";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";

import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../../store/CartContext";
import CartItem from "./CartItem";

const Cart = ({ onClose }) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartContextData = useContext(CartContext);

	const totalAmount = `$${cartContextData.totalAmount.toFixed(2)}`;
	const hasItems = cartContextData.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartContextData.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartContextData.addItem(item);
	};

	const cartItems = (
		<ul className={styles["cart-items"]}>
			{cartContextData.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const modalActions = (
		<div className={styles.actions}>
			<button className={styles["button--alt"]} onClick={onClose}>
				CLOSE
			</button>
			{hasItems && (
				<button
					className={styles.button}
					onClick={() => {
						orderHandler();
					}}
				>
					Order
				</button>
			)}
		</div>
	);

	const submitOrderHandler = async (userData) => {
		try {
			setIsSubmitting(true);
			const response = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/orders.json`,
				{ user: userData, orderedItems: cartContextData.items }
			);
			setIsSubmitting(false);
			setDidSubmit(true);
		} catch (error) {
			console.clear();
			console.error("SOME ERROR OCCURED");
		}
	};

	const cartModalContent = (
		<React.Fragment>
			{" "}
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={onClose} />
			)}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;
	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div className={styles.actions}>
				<button className={styles.button} onClick={onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClose={onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
