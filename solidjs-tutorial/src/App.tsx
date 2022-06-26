import type { Component } from "solid-js";
import Bookshelf from "./Bookshelf";

const App: Component = () => {
  return (
    <>
      <Bookshelf name={`Solid`} />
      {/* <Counter /> */}
    </>
  );
};

export default App;
