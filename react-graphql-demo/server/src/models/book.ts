import _ from "mongoose";
const { Schema, model } = _;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

const bookModel = model("Books", bookSchema);
export { bookModel };
