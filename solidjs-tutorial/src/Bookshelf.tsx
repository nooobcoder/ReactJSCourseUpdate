import AddBook from "./AddBook";
import BookList from "./BookList";

interface IBookshelfProps {
  name: string;
}

export default function Bookshelf(props: IBookshelfProps) {
  return (
    <div>
      <h1>{props.name}'s Bookshelf</h1>
      <BookList />
      <AddBook />
    </div>
  );
}
