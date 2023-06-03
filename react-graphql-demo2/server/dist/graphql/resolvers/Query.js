"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Query = {
    mainCards: function (_, __, _a) {
        var mainCards = _a.mainCards;
        return mainCards;
    },
    animals: function (_, __, _a) {
        var animals = _a.animals;
        return animals;
    },
    animal: function (parent, args, _a) {
        var animals = _a.animals;
        return animals.find(function (animal) { return animal.slug === args.slug; });
    },
    categories: function (_, __, _a) {
        var categories = _a.categories;
        return categories;
    },
    category: function (_, _a, _b) {
        var slug = _a.slug;
        var categories = _b.categories;
        return categories.find(function (cat) { return cat.slug === slug; });
    },
};
exports.default = Query;
//# sourceMappingURL=Query.js.map