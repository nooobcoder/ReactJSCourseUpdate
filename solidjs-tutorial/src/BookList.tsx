import { For } from "solid-js";

import type { Book } from "./App";

interface IBookListProps {
  books: Book[];
}

export default function BookList(props: IBookListProps) {
  const totalBooks = () => props.books.length;

  return (
    <>
      <h2>My books ({totalBooks()})</h2>
      <ul>
        <For each={props.books}>
          {(book) => {
            return (
              <li>
                {book.title}{" "}
                <span style={{ "font-style": "italic" }}>({book.author})</span>
              </li>
            );
          }}
        </For>
      </ul>
    </>
  );
}
