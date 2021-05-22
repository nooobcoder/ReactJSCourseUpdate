import { createSlice } from "@reduxjs/toolkit";

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

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice;
