import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLString, } from "graphql";
import { authorModel } from "../models/author.js";
import { bookModel } from "../models/book.js";
var BookType = new GraphQLObjectType({
    name: "Book",
    fields: function () { return ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: function (_a, args) {
                var authorId = _a.authorId;
                return authorModel.findById(authorId);
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
                return bookModel.find({
                    authorId: authorId,
                });
            },
        },
    }); },
});
var Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: function (parent, _a) {
                var name = _a.name, age = _a.age;
                var author = new authorModel({ name: name, age: age });
                return author.save();
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: function (parent, _a) {
                var name = _a.name, genre = _a.genre, authorId = _a.authorId;
                var book = new bookModel({ name: name, genre: genre, authorId: authorId });
                return book.save();
            },
        },
    },
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
                var id = args.id;
                return bookModel.findById(id);
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: function (parent, _a) {
                var id = _a.id;
                return authorModel.findById(id);
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: function (parent, args) { return bookModel.find(); },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: function () { return authorModel.find(); },
        },
    },
});
var graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
// Named export
export { graphqlSchema };
//# sourceMappingURL=schema.js.map