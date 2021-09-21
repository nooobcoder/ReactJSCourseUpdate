"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category = {
    animals: function (_a, _, _b) {
        var id = _a.id;
        var animals = _b.animals;
        return animals.filter(function (animal) { return animal.category === id; });
    },
};
exports.default = Category;
//# sourceMappingURL=Category.js.map