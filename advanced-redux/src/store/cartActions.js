import { showNotification } from "./uiSlice";
import { replaceCart, setItemStore } from "./cartSlice";

export const fetchItemStore = () => {
	// Send HTTP request
	const endpoint = process.env.REACT_APP_API_ENDPOINT;
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(`${endpoint}/items.json`);

			if (!response.ok) {
				throw new Error("Could not fetch cart data!");
			}
			const data = await response.json();
			const store = [];
			for (const item in data) {
				store.push(data[item]);
			}
			dispatch(setItemStore(store));
		};

		try {
			const cartData = await fetchData();
			dispatch(
				replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				})
			);
		} catch (error) {
			dispatch(
				showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching cart data failed!",
				})
			);
		}
	};
};

export const fetchCartData = () => {
	// Send HTTP request
	const endpoint = process.env.REACT_APP_API_ENDPOINT;
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(`${endpoint}/cart.json`);

			if (!response.ok) {
				throw new Error("Could not fetch cart data!");
			}
			const data = await response.json();
			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				})
			);
		} catch (error) {
			dispatch(
				showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching cart data failed!",
				})
			);
		}
	};
};

export const sendCartData = ({ items, totalQuantity }) => {
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
				body: JSON.stringify({ items, totalQuantity }),
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
