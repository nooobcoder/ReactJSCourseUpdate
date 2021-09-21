"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var graphql_1 = require("./graphql");
var server = new apollo_server_1.ApolloServer({ typeDefs: graphql_1.typeDefs, resolvers: graphql_1.resolvers });
server.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
//# sourceMappingURL=index.js.map