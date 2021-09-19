import { gql } from "apollo-boost";

const GET_BOOK = gql`
	query getBook($id: ID!) {
		book(id: $id) {
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;

const GET_BOOKS_QUERY = gql`
	{
		books {
			id
			name
			genre
		}
	}
`;

const GET_AUTHORS_QUERY = gql`
	{
		authors {
			id
			name
			age
		}
	}
`;

const ADD_BOOK_MUTATION = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			genre
			author {
				name
				age
			}
		}
	}
`;

export { GET_BOOK, GET_AUTHORS_QUERY, GET_BOOKS_QUERY, ADD_BOOK_MUTATION };
