import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./uiSlice";

const initialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		removeItemFromCart(prevState, action) {
			const id = action.payload;
			const existingItem = prevState.items.find((item) => item.id === id);
			prevState.totalQuantity--;
			if (existingItem.quantity === 1) {
				prevState.items = prevState.items.filter(
					(item) => item.id !== id
				);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice -= existingItem.price;
			}
		},
		addItemToCart(prevState, action) {
			const newItem = action.payload;
			const existingItem = prevState.items.find(
				(item) => item.id === newItem.id
			);
			prevState.totalQuantity++;
			if (!existingItem) {
				prevState.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice =
					existingItem.totalPrice + newItem.price;
			}
		},
	},
});

export const sendCartData = (cartState) => {
	return async (dispatch) => {
		// Send HTTP request
		const endpoint = process.env.REACT_APP_API_ENDPOINT;
		try {
			dispatch(
				showNotification({
					status: "pending",
					title: "Sending",
					message: "Sending cart data!",
				})
			);

			const response = await fetch(`${endpoint}/cart.json`, {
				method: "PUT",
				body: JSON.stringify(cartState),
			});

			if (!response.ok) throw new Error("Sending cart data failed");

			dispatch(
				showNotification({
					status: "success",
					title: "Success",
					message: "Sent cart data successfully!",
				})
			);
		} catch (error) {
			dispatch(
				showNotification({
					status: "error",
					title: "Error!",
					message: "Sending cart data failed!",
				})
			);
		}
	};
};

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice;
