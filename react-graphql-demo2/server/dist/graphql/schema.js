"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type MainCard {\n    title: String!\n    image: String!\n  }\n  type Animal {\n    image: String!\n    title: String!\n    rating: Float\n    price: String!\n    slug: String!\n    description: [String!]!\n    stock: Int!\n    onSale: Boolean\n    category: Category\n  }\n  type Category {\n    id: String!\n    image: String!\n    category: String!\n    slug: String!\n    animals: [Animal!]!\n  }\n  type Query {\n    mainCards: [MainCard]\n    animals: [Animal!]!\n    animal(slug: String!): Animal\n    categories: [Category!]!\n    category(slug: String!): Category\n  }\n"], ["\n  type MainCard {\n    title: String!\n    image: String!\n  }\n  type Animal {\n    image: String!\n    title: String!\n    rating: Float\n    price: String!\n    slug: String!\n    description: [String!]!\n    stock: Int!\n    onSale: Boolean\n    category: Category\n  }\n  type Category {\n    id: String!\n    image: String!\n    category: String!\n    slug: String!\n    animals: [Animal!]!\n  }\n  type Query {\n    mainCards: [MainCard]\n    animals: [Animal!]!\n    animal(slug: String!): Animal\n    categories: [Category!]!\n    category(slug: String!): Category\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;
//# sourceMappingURL=schema.js.map