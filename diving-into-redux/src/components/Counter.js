// import { Component } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { TOGGLE_COUNTER, INCREMENT, INCREASE, DECREMENT } from "../store/index";

//! PART OF REDUX-TOOLKIT
import { decrement, increase, increment, toggle } from "../store/counterSlice";
import classes from "./Counter.module.css";

const Counter = () => {
	const dispatch = useDispatch();
	/* const counter = useSelector((state) => state.counter); // Using only the counter slice of the global state
	const showCounter = useSelector(({ showCounter }) => showCounter); */

	//! PART OF REDUX-TOOLKIT
	const { counter, showCounter } = useSelector((state) => state.counter);
	const incrementHandler = () => {
		// dispatch({ type: INCREMENT })
		dispatch(increment());
	};
	const decrementHandler = () => {
		// dispatch({ type: DECREMENT });
		dispatch(decrement());
	};
	const increaseHandler = () => {
		// dispatch({ type: INCREASE, payload: 10 })
		dispatch(increase(10));
	};

	const toggleCounterHandler = () => {
		// dispatch({ type: TOGGLE_COUNTER });
		dispatch(toggle());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{showCounter && (
				<Fragment>
					<div className={classes.value}>{counter}</div>

					<div>
						<button onClick={incrementHandler}>Increment</button>
						<button onClick={() => increaseHandler()}>
							Increment by 10
						</button>
						{counter > 0 && (
							<button onClick={decrementHandler}>
								Decrement
							</button>
						)}
					</div>
				</Fragment>
			)}

			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};
export default Counter;

/* class Counter extends Component {
	toggleCounterHandler() {}

	incrementHandler() {
		this.props.increment();
	}
	decrementHandler() {
		this.props.decrement();
	}
	render() {
		return (
			<main className={classes.counter}>
				<h1>Redux Counter</h1>
				<div className={classes.value}>{this.props.counter}</div>

				<div>
					<button onClick={this.incrementHandler.bind(this)}>
						Increment
					</button>
					{this.props.counter > 0 && (
						<button onClick={this.decrementHandler.bind(this)}>
							Decrement
						</button>
					)}
				</div>
				<button onClick={this.toggleCounterHandler.bind(this)}>
					Toggle Counter
				</button>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return { counter: state.counter };
};

const mapDispatchToProps = (dispatch) => {
	return {
		increment: () => {
			dispatch({ type: "INCREMENT" });
		},
		decrement: () => {
			dispatch({ type: "DECREMENT" });
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter); */
