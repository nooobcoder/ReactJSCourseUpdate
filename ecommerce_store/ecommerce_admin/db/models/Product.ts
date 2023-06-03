import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	price: {
		type: Number,
		required: true,
		// Define a minimum value for the product price
		min: 1,
	},
});

const Product = models.Product || model("Product", productSchema);

export default Product;
