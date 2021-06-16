import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import { GlobalStyles } from "./globalStyles";
import { firebaseConnection } from "./lib/firebase.prod";
import { FirebaseContext } from "./context/firebaseContext";

const container = document.getElementById("root");
ReactDOM.render(
  <Fragment>
    {/* FirebaseContext is a custom provider that provides access to the firebase object globally in the app */}
    <FirebaseContext.Provider value={{ firebaseConnection }}>
      <GlobalStyles />
      <App />
    </FirebaseContext.Provider>
  </Fragment>,
  container
);
