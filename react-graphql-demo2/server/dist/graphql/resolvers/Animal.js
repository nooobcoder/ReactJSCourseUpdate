"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animal = {
    category: function (_a, _, _b) {
        var category = _a.category;
        var categories = _b.categories;
        return categories.find(function (ctgry) { return ctgry.id === category; });
    },
};
exports.default = Animal;
//# sourceMappingURL=Animal.js.map