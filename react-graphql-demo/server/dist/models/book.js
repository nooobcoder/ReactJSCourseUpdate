import _ from "mongoose";
var Schema = _.Schema, model = _.model;
var bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
}, { versionKey: false });
var bookModel = model("Books", bookSchema);
export { bookModel };
//# sourceMappingURL=book.js.map