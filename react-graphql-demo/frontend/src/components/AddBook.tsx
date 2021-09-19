import { Key, useEffect } from "react";
import { graphql, QueryResult } from "react-apollo";
import { GET_AUTHORS_QUERY } from "../queries";
import { AuthorSchema } from "../schemas";

interface PropTypes {
	data: {
		authors: Array<AuthorSchema>;
	} & QueryResult;
}

const AddBook: React.FunctionComponent<any> = ({
	data: { authors, loading },
}: PropTypes): JSX.Element => {
	useEffect(() => {
		console.log(authors, loading);
	}, [authors, loading]);

	const displayAuthors = () =>
		loading ||
		authors.map(({ id, name }: AuthorSchema) => (
			<option key={id as Key} value={id}>
				{name}
			</option>
		));

	return (
		<form id="add-book">
			<div className="field">
				<label>Book name:</label>
				<input type="text" />
			</div>
			<div className="field">
				<label>Genre:</label>
				<input type="text" />
			</div>
			<div className="field">
				<label>Author:</label>
				<select>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>
			<button>+</button>
		</form>
	);
};

export default graphql(GET_AUTHORS_QUERY)(AddBook);
