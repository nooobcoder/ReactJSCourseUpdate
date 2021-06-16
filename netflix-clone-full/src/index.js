import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import { GlobalStyles } from "./globalStyles";
import { firebaseConnection } from "./lib/firebase.prod";
import { FirebaseContext } from "./context/firebaseContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
console.log("Hi");
root.render(
  <Fragment>
    <FirebaseContext.Provider value={firebaseConnection}>
      <GlobalStyles />
      <App />
    </FirebaseContext.Provider>
  </Fragment>
);
