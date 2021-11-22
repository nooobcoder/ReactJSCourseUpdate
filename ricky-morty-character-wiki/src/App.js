import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { useState, useEffect } from "react";
import { Cards, Filters } from "./components";

const App = () => {
  let [pageNumber, setPageNumber] = useState(1);
  let [fetchedData, updateFetchedData] = useState([]);
  let api = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;
  let { info, results } = fetchedData;

  useEffect(() => {
    (async () => {
      let data = await (await fetch(api)).json();
      updateFetchedData(data);
    })();
  }, [api]);

  return (
    <div className="App">
      ``
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
