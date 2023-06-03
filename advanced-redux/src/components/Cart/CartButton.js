import classes from "./CartButton.module.css";
import { toggle } from "../../store/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
	const dispatch = useDispatch();
	const { totalQuantity } = useSelector((state) => state.cart);
	
	return (
		<button
			className={classes.button}
			onClick={(e) => {
				e.preventDefault();
				dispatch(toggle());
			}}
		>
			<span>My Cart</span>
			<span className={classes.badge}>{totalQuantity}</span>
		</button>
	);
};

export default CartButton;
