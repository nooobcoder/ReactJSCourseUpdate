"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Animal_1 = __importDefault(require("./resolvers/Animal"));
var Category_1 = __importDefault(require("./resolvers/Category"));
var Query_1 = __importDefault(require("./resolvers/Query"));
var resolvers = {
    Query: Query_1.default,
    Category: Category_1.default,
    Animal: Animal_1.default,
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map