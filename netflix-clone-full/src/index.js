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
