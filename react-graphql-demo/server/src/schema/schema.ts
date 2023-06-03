import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { authorModel } from "../models/author.js";
import { bookModel } from "../models/book.js";

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },

    author: {
      type: AuthorType,
      resolve: ({ authorId }, args) => authorModel.findById(authorId),
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
        bookModel.find({
          authorId,
        }),
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, { name, age }) => {
        const author = new authorModel({ name, age });
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
      resolve: (parent, { name, genre, authorId }) => {
        let book = new bookModel({ name, genre, authorId });
        return book.save();
      },
    },
  },
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
        const { id } = args;
        return bookModel.findById(id);
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) => authorModel.findById(id),
    },

    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => bookModel.find(),
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => authorModel.find(),
    },
  },
});

const graphqlSchema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// Named export
export { graphqlSchema };
