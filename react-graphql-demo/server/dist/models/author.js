import _ from "mongoose";
var Schema = _.Schema, model = _.model;
var authorSchema = new Schema({ name: String, age: Number }, { versionKey: false });
var authorModel = model("Authors", authorSchema);
export { authorModel };
//# sourceMappingURL=author.js.map