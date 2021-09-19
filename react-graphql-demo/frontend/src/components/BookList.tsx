import { gql } from "apollo-boost";
import { graphql, QueryResult } from "react-apollo";
import { Key, useEffect } from "react";
interface AuthorSchema {
	id: Key;
	name?: String;
	age?: Number;
	books?: Array<BookSchema>;
}

interface BookSchema {
	id: Key;
	name?: String;
	genre?: String;
	authorId?: String;
	author?: Array<AuthorSchema>;
}

const GET_BOOKS_QUERY = gql`
	{
		books {
			id
			name
			genre
		}
	}
`;

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
		books?.map(({ id, name }: BookSchema) => (
			<li key={id as Key}>{name}</li>
		));

	return (
		<div>
			<ul id="book-list">{displayBooks()}</ul>
		</div>
	);
};

export default graphql(GET_BOOKS_QUERY)(BookList);
