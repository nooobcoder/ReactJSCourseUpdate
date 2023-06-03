const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
		text: {
			type: String,
			unique: false,
			required: [true, "Please add a text value"],
		},
	},
	{
		timestamps: true, // Creates a updated/created at field
	}
);

module.exports = mongoose.model("Goal", goalSchema);
