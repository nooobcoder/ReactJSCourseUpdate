"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
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
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map