"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var db_1 = require("./db");
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type MainCard {\n    title: String!\n    image: String!\n  }\n  type Animal {\n    image: String!\n    title: String!\n    rating: Float\n    price: String!\n    slug: String!\n    description: [String!]!\n    stock: Int!\n    onSale: Boolean\n    category: Category\n  }\n  type Category {\n    id: String!\n    image: String!\n    category: String!\n    slug: String!\n    animals: [Animal!]!\n  }\n  type Query {\n    mainCards: [MainCard]\n    animals: [Animal!]!\n    animal(slug: String!): Animal\n    categories: [Category!]!\n    category(slug: String!): Category\n  }\n"], ["\n  type MainCard {\n    title: String!\n    image: String!\n  }\n  type Animal {\n    image: String!\n    title: String!\n    rating: Float\n    price: String!\n    slug: String!\n    description: [String!]!\n    stock: Int!\n    onSale: Boolean\n    category: Category\n  }\n  type Category {\n    id: String!\n    image: String!\n    category: String!\n    slug: String!\n    animals: [Animal!]!\n  }\n  type Query {\n    mainCards: [MainCard]\n    animals: [Animal!]!\n    animal(slug: String!): Animal\n    categories: [Category!]!\n    category(slug: String!): Category\n  }\n"])));
var resolvers = {
    Query: {
        mainCards: function () { return db_1.mainCards; },
        animals: function () { return db_1.animals; },
        animal: function (parent, args, ctx) { return db_1.animals.find(function (animal) { return animal.slug === args.slug; }); },
        categories: function () { return db_1.categories; },
        category: function (_, _a) {
            var slug = _a.slug;
            return db_1.categories.find(function (cat) { return cat.slug === slug; });
        },
    },
    Category: {
        animals: function (_a) {
            var id = _a.id;
            return db_1.animals.filter(function (animal) { return animal.category === id; });
        },
    },
    Animal: {
        category: function (_a) {
            var category = _a.category;
            return db_1.categories.find(function (ctgry) { return ctgry.id === category; });
        },
    },
};
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
//# sourceMappingURL=index.js.map