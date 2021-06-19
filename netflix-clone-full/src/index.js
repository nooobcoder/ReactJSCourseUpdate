import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "normalize.css";
import { GlobalStyles } from "./globalStyles";
import { firebaseConnection } from "./lib/firebase.prod";
import { FirebaseContext } from "./context/firebaseContext";
import AnimatedCursor from "react-animated-cursor";

import store from "./context";

// Print custom message when the app is not in development mode.
if (process.env.REACT_APP_STATE !== "development") {
  console.log(
    "%cWarning",
    "background: yellow; color: red; font-size: xx-large"
  );
  console.log(
    "%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.Do not enter or paste code that you do not understand.",
    "color: gray; font-size: medium"
  );
}
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <Fragment>
    {/* FirebaseContext is a custom provider that provides access to the firebase object globally in the app */}
    <FirebaseContext.Provider value={{ firebaseConnection }}>
      <Provider store={store}>
        <AnimatedCursor
          innerSize={8}
          outerSize={9}
          color="229, 9, 20"
          outerAlpha={0.1}
          innerScale={0.7}
          outerScale={4}
        />
        <GlobalStyles />
        <App />
      </Provider>
    </FirebaseContext.Provider>
  </Fragment>,
  container
);
