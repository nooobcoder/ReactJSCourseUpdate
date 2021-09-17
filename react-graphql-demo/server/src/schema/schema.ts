import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import _ from "lodash";
const { find } = _;

const DummyBooks = [
	{ name: "Name of the Wind", genre: "Fantasy", id: "1" },
	{ name: "The Final Empire", genre: "Fantasy", id: "2" },
	{ name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

///////

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// The field names here, should match with the query in the frontend/client
		book: {
			type: BookType,
			// Required arguments
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// Code to get data from db
				// Parent is for relating data from other nodes in graph
				// args -> id (arguments from the client request)

				const { id } = args;
				return find(DummyBooks, { id });
			},
		},
	},
});

const graphqlSchema = new GraphQLSchema({ query: RootQuery });

// Named export
export { graphqlSchema };
