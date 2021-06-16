import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "normalize.css";
import { GlobalStyles } from "./globalStyles";
import { firebaseConnection } from "./lib/firebase.prod";
import { FirebaseContext } from "./context/firebaseContext";
import store from "./context";

const container = document.getElementById("root");
ReactDOM.render(
  <Fragment>
    {/* FirebaseContext is a custom provider that provides access to the firebase object globally in the app */}
    <FirebaseContext.Provider value={{ firebaseConnection }}>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </FirebaseContext.Provider>
  </Fragment>,
  container
);
