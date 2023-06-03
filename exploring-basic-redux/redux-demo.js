const redux = require("redux");

const counterReducer = (prevState = { counter: 0 }, { type, payload }) => {
	switch (type) {
		case "INCREMENT":
			return { ...prevState, counter: prevState.counter + 1 };
		case "DECREMENT":
			return { ...prevState, counter: prevState.counter - 1 };
		default:
			return { ...prevState };
	}
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
	const latestState = store.getState();
	console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
