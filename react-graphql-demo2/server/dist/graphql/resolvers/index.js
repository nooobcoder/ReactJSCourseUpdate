"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Animal_1 = __importDefault(require("./Animal"));
var Category_1 = __importDefault(require("./Category"));
var Query_1 = __importDefault(require("./Query"));
var resolvers = {
    Query: Query_1.default,
    Category: Category_1.default,
    Animal: Animal_1.default,
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map