import { Key, useEffect } from "react";
import { graphql, QueryResult } from "react-apollo";
import { GET_BOOKS_QUERY } from "../queries";
import { BookSchema } from "../schemas";

interface PropTypes {
	data: {
		books: Array<BookSchema>;
	} & QueryResult;
}

const BookList: React.FunctionComponent<any> = ({
	data: { books, loading },
}: PropTypes): JSX.Element => {
	useEffect(() => {
		console.log(books, loading);
	}, [books, loading]);

	const displayBooks = () =>
		loading ||
		books
			.map((value) => ({ value, sort: Math.random() })) // Shuffling the array
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value)
			?.map(
				(
					{ id, name }: BookSchema // Rendering the shuffled array
				) => <li key={id as Key}>{name}</li>
			);

	return (
		<div>
			<ul id="book-list">{displayBooks()}</ul>
		</div>
	);
};

export default graphql(GET_BOOKS_QUERY)(BookList);
