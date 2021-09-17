import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, } from "graphql";
import _ from "lodash";
var find = _.find, filter = _.filter;
var DummyBooks = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
];
var DummyAuthors = [
    { name: "Patrick Rothfuss", age: 44, id: "1" },
    { name: "Brandon Sanderson", age: 42, id: "2" },
    { name: "Terry Pratchett", age: 66, id: "3" },
];
///////
var BookType = new GraphQLObjectType({
    name: "Book",
    fields: function () { return ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: function (parent, args) {
                var id = parent.authorId;
                return find(DummyAuthors, { id: id });
            },
        },
    }); },
});
var AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: function () { return ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        // Get list of the author's books using GraphQLList type
        books: {
            type: new GraphQLList(BookType),
            resolve: function (_a, args) {
                var authorId = _a.id;
                return filter(DummyBooks, { authorId: authorId });
            },
        },
    }); },
});
var RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // The field names here, should match with the query in the frontend/client
        book: {
            type: BookType,
            // Required arguments
            args: { id: { type: GraphQLID } },
            resolve: function (parent, args) {
                // Code to get data from db
                // Parent is for relating data from other nodes in graph
                // args -> id (arguments from the client request)
                var id = args.id;
                return find(DummyBooks, { id: id });
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: function (parent, _a) {
                var id = _a.id;
                return find(DummyAuthors, { id: id });
            },
        },
    },
});
var graphqlSchema = new GraphQLSchema({ query: RootQuery });
// Named export
export { graphqlSchema };
//# sourceMappingURL=schema.js.map