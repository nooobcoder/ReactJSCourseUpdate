import { Key, useEffect, useState } from "react";
import { graphql, QueryResult, useMutation } from "react-apollo";
import {
	ADD_BOOK_MUTATION,
	GET_AUTHORS_QUERY,
	GET_BOOKS_QUERY,
} from "../queries";
import { AuthorSchema, BookSchema } from "../schemas";

interface PropTypes {
	data: {
		authors: Array<AuthorSchema>;
	} & QueryResult;
}

enum STATE_FIELDS {
	BOOK_NAME = "BOOK_NAME",
	GENRE = "GENRE",
	AUTHOR_ID = "AUTHOR_ID",
}

const AddBook: React.FunctionComponent<any> = ({
	data: { authors, loading },
}: PropTypes): JSX.Element => {
	const [formData, setUploadData] = useState<BookSchema>({
		name: undefined,
		genre: undefined,
		authorId: undefined,
	});

	useEffect(() => {}, [authors, loading]);

	const displayAuthors = () =>
		loading ||
		authors.map(({ id, name }: AuthorSchema) => (
			<option key={id as Key} value={id}>
				{name}
			</option>
		));

	const [addBookToDatabase, result] = useMutation(ADD_BOOK_MUTATION);

	const stateManager = (value: String, fieldName: STATE_FIELDS) => {
		switch (fieldName) {
			case STATE_FIELDS.BOOK_NAME:
				setUploadData((prevState: BookSchema) => ({
					...prevState,
					name: value,
				}));
				break;
			case STATE_FIELDS.GENRE:
				setUploadData((prevState: BookSchema) => ({
					...prevState,
					genre: value,
				}));
				break;
			case STATE_FIELDS.AUTHOR_ID:
				setUploadData((prevState: BookSchema) => ({
					...prevState,
					authorId: value,
				}));
				break;
			default:
				console.warn("INVALID FIELD NAME FOR STATE UPDATE");
		}
	};

	return (
		<form id="add-book">
			<div className="field">
				<label>Book name:</label>
				<input
					type="text"
					onChange={(e) =>
						stateManager(e.target.value, STATE_FIELDS.BOOK_NAME)
					}
				/>
			</div>
			<div className="field">
				<label>Genre:</label>
				<input
					type="text"
					onChange={(e) =>
						stateManager(e.target.value, STATE_FIELDS.GENRE)
					}
				/>
			</div>
			<div className="field">
				<label>Author:</label>
				<select
					onChange={(e) =>
						stateManager(e.target.value, STATE_FIELDS.AUTHOR_ID)
					}
				>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>
			<button
				type="submit"
				onClick={(e) => {
					e.preventDefault();
					if (formData.name && formData.authorId)
						addBookToDatabase({
							variables: { ...formData },
							refetchQueries: [{ query: GET_BOOKS_QUERY }],
						});
				}}
			>
				+
			</button>
		</form>
	);
};

export default graphql(GET_AUTHORS_QUERY)(AddBook);
