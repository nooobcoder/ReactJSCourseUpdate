import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import _ from "lodash";
var find = _.find;
var DummyBooks = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];
///////
var BookType = new GraphQLObjectType({
    name: "Book",
    fields: function () { return ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }); },
});
var RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // The field names here, should match with the query in the frontend/client
        book: {
            type: BookType,
            // Required arguments
            args: { id: { type: GraphQLString } },
            resolve: function (parent, args) {
                // Code to get data from db
                // Parent is for relating data from other nodes in graph
                // args -> id (arguments from the client request)
                var id = args.id;
                return find(DummyBooks, { id: id });
            },
        },
    },
});
var graphqlSchema = new GraphQLSchema({ query: RootQuery });
// Named export
export { graphqlSchema };
//# sourceMappingURL=schema.js.map