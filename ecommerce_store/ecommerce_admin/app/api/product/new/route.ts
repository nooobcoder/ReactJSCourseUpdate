// Example: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
// const res = await fetch("https://data.mongodb-api.com/...", {
// 	headers: {
// 		"Content-Type": "application/json",
// 		"API-Key": process.env.DATA_API_KEY,
// 	},
// });
// const data = await res.json();

// return NextResponse.json({ data });

import Product from "@/db/models/Product";
import clientPromise from "@/db/mongo";
import { mongooseConnect } from "@/db/mongooseConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type RequestBody = {
	name: string;
	description: string;
	price: number;
};

type ErrorResponse = {
	error: string;
	errorTrace: any;
};

export async function POST(request: Request) {
	const res = (await request.json()) as RequestBody;
	const { name, description, price } = res;

	try {
		// Connect to MongoDB
		mongoose.Promise = clientPromise;
		await mongooseConnect();
	} catch (error) {
		let errorData: ErrorResponse = {
			error: "Error connecting to MongoDB",
			errorTrace: error,
		};

		return NextResponse.json(errorData);
	}

	// Try creating the product in MongoDB
	try {
		const productDoc = await Product.create({
			name,
			description,
			price,
		});

		return NextResponse.json(productDoc, {
			status: 201,
			statusText: "Created product in MongoDB",
		});
	} catch (error) {
		let errorData: ErrorResponse = {
			error: "Error creating product in MongoDB",
			errorTrace: error,
		};

		return NextResponse.json(errorData);
	}
}
