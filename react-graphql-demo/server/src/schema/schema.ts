import {
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from "graphql";
import _ from "lodash";
const { find, filter } = _;

const DummyBooks = [
	{ name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
	{ name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
	{ name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
];
const DummyAuthors = [
	{ name: "Patrick Rothfuss", age: 44, id: "1" },
	{ name: "Brandon Sanderson", age: 42, id: "2" },
	{ name: "Terry Pratchett", age: 66, id: "3" },
];
///////

const BookType: GraphQLObjectType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },

		author: {
			type: AuthorType,
			resolve: (parent, args) => {
				const { authorId: id } = parent;
				return find(DummyAuthors, { id });
			},
		},
	}),
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },

		// Get list of the author's books using GraphQLList type
		books: {
			type: new GraphQLList(BookType),
			resolve: ({ id: authorId }, args) =>
				filter(DummyBooks, { authorId }),
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// The field names here, should match with the query in the frontend/client
		book: {
			type: BookType,
			// Required arguments
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// Code to get data from db
				// Parent is for relating data from other nodes in graph
				// args -> id (arguments from the client request)

				const { id } = args;
				return find(DummyBooks, { id });
			},
		},

		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve: (parent, { id }) => find(DummyAuthors, { id }),
		},
	},
});

const graphqlSchema = new GraphQLSchema({ query: RootQuery });

// Named export
export { graphqlSchema };
