import { useContext } from "react";
import { useQuery } from "react-apollo";
import { selectedBookContext } from "../context";
import { GET_BOOK } from "../queries";

const BookDetails = () => {
	const { id } = useContext(selectedBookContext);
	const { loading, error, data } = useQuery(GET_BOOK, { variables: { id } });
	const getBookDetails = () => {
		if (data) {
			const { book } = data;
			const { author } = book;
			return (
				<div>
					<h1>{book.name}</h1>
					<p
						style={{
							background: "orange",
							width: "auto",
							padding: "6px",
							borderRadius: "3px",
							display: "inline-block",
						}}
					>
						{book.genre}
					</p>
					<p>{author.name}</p>
					<p>All books by this author:</p>
					<ul className="other-books">
						{author.books.map((item: any) => {
							return <li key={item.id}>{item.name}</li>;
						})}
					</ul>
				</div>
			);
		} else {
			return <></>;
		}
	};

	return <div id="book-details">{getBookDetails()}</div>;
};

export default BookDetails;
