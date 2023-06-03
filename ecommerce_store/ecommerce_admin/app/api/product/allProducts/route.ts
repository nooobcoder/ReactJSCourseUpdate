import Product from "@/db/models/Product";
import clientPromise from "@/db/mongo";
import { mongooseConnect } from "@/db/mongooseConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// type RequestBody = {
// 	name: string;
// 	description: string;
// 	price: number;
// };

type ErrorResponse = {
	error: string;
	errorTrace: any;
};

export async function GET() {
	// Get all products from the database

	try {
		// Connect to MongoDB
		mongoose.Promise = clientPromise;
		await mongooseConnect();
	} catch (error) {
		let errorData: ErrorResponse = {
			error: "Error connecting to MongoDB",
			errorTrace: error,
		};

		return NextResponse.json(errorData, { status: 500 });
	}

	try {
		const productsDoc = await Product.find({});

		return NextResponse.json(productsDoc, {
			status: 200,
			statusText: "Fetched products from database",
		});
	} catch (error) {
		let errorData: ErrorResponse = {
			error: "Error getting all products in MongoDB",
			errorTrace: error,
		};

		return NextResponse.json(errorData);
	}
}
