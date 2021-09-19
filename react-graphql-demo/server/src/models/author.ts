import _ from "mongoose";
const { Schema, model } = _;

const authorSchema = new Schema(
  { name: String, age: Number },
  { versionKey: false },
);

const authorModel = model("Authors", authorSchema);
export { authorModel };
