import { Key, useEffect, useState } from "react";
import { graphql, QueryResult } from "react-apollo";
import { GET_BOOKS_QUERY } from "../queries";
import { BookSchema } from "../schemas";

import { selectedBookContext } from "../context";
import BookDetails from "./BookDetails";

interface PropTypes {
	data: {
		books: Array<BookSchema>;
	} & QueryResult;
}

const BookList: React.FunctionComponent<any> = ({
	data: { books, loading },
}: PropTypes): JSX.Element => {
	const [selectedBookId, setSelectedBook] = useState<BookSchema>({
		id: undefined,
	});

	const displayBooks = () =>
		loading ||
		books
			.map((value) => ({ value, sort: Math.random() })) // Shuffling the array
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value)
			?.map(
				(
					{ id, name }: BookSchema // Rendering the shuffled array
				) => (
					<li
						key={id as Key}
						onClick={(e) => setSelectedBook({ id })}
					>
						{name}
					</li>
				)
			);

	return (
		<selectedBookContext.Provider value={selectedBookId}>
			<ul id="book-list">{displayBooks()}</ul>
			<BookDetails />
		</selectedBookContext.Provider>
	);
};

export default graphql(GET_BOOKS_QUERY)(BookList);
