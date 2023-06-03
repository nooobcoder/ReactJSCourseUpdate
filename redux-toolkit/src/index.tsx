import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Custom imports
import "./index.css";
import App from "./App";
import { store } from "./app/store";

const rootElement = document.getElementById("app");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.createRoot(rootElement).render(
	<Provider store={store}>
		<App />
	</Provider>
);
