import { createSignal, Show } from "solid-js";

import AddBook from "./AddBook";
import BookList from "./BookList";

import type { Book } from "./App";

interface IBookshelfProps {
  name: string;
}

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

export default function Bookshelf(props: IBookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);
  const toggleForm = () => setShowForm(!showForm());

  return (
    <div>
      <h1>{props.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={!showForm()}
        fallback={<button onClick={toggleForm}>Finished adding books</button>}
      >
        <AddBook setBooks={setBooks} />
        <button onClick={toggleForm}>Add a book</button>
      </Show>
    </div>
  );
}
