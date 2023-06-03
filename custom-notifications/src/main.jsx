import React from "react";
import App from "./App";
import "./index.css";
import serviceWorker from "./serviceWorker.js";
import { subscribeUser } from "./subscription";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.register();
subscribeUser();
