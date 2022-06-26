import { createSignal, JSX } from "solid-js";

import type { Setter } from "solid-js";
import type { Book } from "./App";
export interface IAddBookProps {
  setBooks: Setter<Book[]>;
}

const emptyBook: Book = { title: "", author: "" };

export default function AddBook(props: IAddBookProps) {
  const [newBook, setNewBook] = createSignal(emptyBook);
  const addBook: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
    props.setBooks((books) => [...books, newBook()]);
    setNewBook(emptyBook);
  };
  return (
    <form>
      <div>
        <label for="title">Book name</label>
        <input
          id="title"
          value={newBook().title}
          onInput={(e) => {
            setNewBook({ ...newBook(), title: e.currentTarget.value });
          }}
        />
      </div>
      <br />
      <div>
        <label for="author">Author</label>
        <input
          id="author"
          value={newBook().author}
          onInput={(e) => {
            setNewBook({ ...newBook(), author: e.currentTarget.value });
          }}
        />
      </div>
      <button type="submit" onClick={addBook}>
        Add book
      </button>
    </form>
  );
}
