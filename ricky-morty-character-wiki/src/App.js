import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React from "react";
import { Cards, Filters } from "./components";

const App = () => {
  return (
    <div className="App">
      <h1 className="text-center ubuntu my-4">
        Rick &amp; Morty <span className="text-primary">Wiki</span>
      </h1>

      <div className="container">
        <div className="row">
          <div className="col-3">
            <Filters />
          </div>
          <div className="col-8">
            <div className="row">
              <Cards />
              <Cards />
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
