import { Key } from "react";

export interface AuthorSchema {
	id?: Key;
	name?: String;
	age?: Number;
	books?: Array<BookSchema>;
}

export interface BookSchema {
	id?: Key;
	name?: String;
	genre?: String;
	authorId?: String;
	author?: Array<AuthorSchema>;
}
