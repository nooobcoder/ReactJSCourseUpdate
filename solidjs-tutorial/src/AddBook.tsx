import { createResource, createSignal } from "solid-js";
import { For, Show } from "solid-js/web";
import { searchBooks } from "./utils/searchBooks";

import type { Setter } from "solid-js";
import type { Book } from "./App";

export interface IAddBookProps {
  setBooks: Setter<Book[]>;
}

const emptyBook: Book = { title: "", author: "" };

export default function AddBook(props: IAddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");
  const [data] = createResource<Array<Book>, string>(query, searchBooks);

  return (
    <>
      <form>
        <div>
          <label for="title">Search books</label>
          <input
            id="title"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
            }}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setQuery(input());
          }}
        >
          Search
        </button>
      </form>
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li>
                {book.title} by {book.author}{" "}
                <button
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onClick={(e) => {
                    e.preventDefault();
                    props.setBooks((books) => [...books, book]);
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
