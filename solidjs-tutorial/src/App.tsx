import type { Component } from "solid-js";
import Bookshelf from "./Bookshelf";

export type Book = {
  title: string;
  author: string;
};

const App: Component = () => {
  return (
    <>
      <Bookshelf name={`Solid`} />
    </>
  );
};

export default App;
