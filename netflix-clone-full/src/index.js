import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import { GlobalStyles } from "./globalStyles";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
	<Fragment>
		<GlobalStyles />
		<App />
	</Fragment>
);
