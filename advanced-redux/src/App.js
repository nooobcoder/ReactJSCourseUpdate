import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import {
	sendCartData,
	fetchCartData,
	fetchItemStore,
} from "./store/cartActions";

let isRunFirstTime = true;

function App() {
	const { cartIsVisible, notification } = useSelector((state) => state.ui);
	const cartState = useSelector(({ cart }) => cart);
	const dispatch = useDispatch();
	useEffect(() => {
		if (isRunFirstTime) {
			dispatch(fetchItemStore());
			dispatch(fetchCartData());
		} else {
			return;
		}
	}, [dispatch]);

	useEffect(() => {
		if (!isRunFirstTime) {
			dispatch(sendCartData(cartState));
		} else {
			isRunFirstTime = false;
			return;
		}
	}, [cartState, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification?.status}
					title={notification?.title}
					message={notification?.message}
				/>
			)}

			<Layout>
				{cartIsVisible && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
