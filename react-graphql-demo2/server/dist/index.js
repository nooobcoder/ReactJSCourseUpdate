"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require("apollo-server"), ApolloServer = _a.ApolloServer, gql = _a.gql;
var typeDefs = gql(__makeTemplateObject(["\n\ttype Book {\n\t\ttitle: String\n\t\tauthor: String\n\t}\n\ttype Query {\n\t\tbooks: [Book]\n\t}\n"], ["\n\ttype Book {\n\t\ttitle: String\n\t\tauthor: String\n\t}\n\ttype Query {\n\t\tbooks: [Book]\n\t}\n"]));
var books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];
var resolvers = {
    Query: { books: function () { return books; } },
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
//# sourceMappingURL=index.js.map