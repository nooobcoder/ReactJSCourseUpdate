import { gql } from "apollo-boost";

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

export { GET_AUTHORS_QUERY, GET_BOOKS_QUERY };
