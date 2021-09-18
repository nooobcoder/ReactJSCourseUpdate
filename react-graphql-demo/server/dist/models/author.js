import _ from "mongoose";
var Schema = _.Schema, model = _.model;
var authorSchema = new Schema({ name: String, age: Number });
var authorModel = model("Authors", authorSchema);
export { authorModel };
//# sourceMappingURL=author.js.map