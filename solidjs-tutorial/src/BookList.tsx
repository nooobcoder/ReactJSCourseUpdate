import { createSignal, For } from "solid-js";

type Book = {
  title: string;
  author: string;
};

const initialBooks: Array<Book> = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

export default function () {
  const [books, setBooks] = createSignal(initialBooks);

  const totalBooks = books().length;

  return (
    <>
      <h2>My Books ({totalBooks})</h2>
      <ul>
        {/* SolidJS Way */}
        <For each={books()}>
          {(book) => (
            <li>
              {`${book.title} `}
              <span style={{ "font-style": "italic" }}>{book.author}</span>
            </li>
          )}
        </For>

        {/* React Way */}
        {/* {books().map((book) => (
        <li>
          {`${book.title} `}
          <span style={{ "font-style": "italic" }}>{book.author}</span>
        </li>
      ))} */}
      </ul>
    </>
  );
}
