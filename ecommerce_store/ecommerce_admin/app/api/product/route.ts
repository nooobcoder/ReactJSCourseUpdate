import Product from "@/db/models/Product";
import clientPromise from "@/db/mongo";
import { mongooseConnect } from "@/db/mongooseConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type ErrorResponse = {
	error: string;
	errorTrace: any;
};

const getProductById = async (id: string) => {
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
		const productDoc = await Product.findById(id);
		const product = productDoc.toObject();

		return NextResponse.json(product, {
			status: 200,
		});
	} catch (error) {
		let errorData: ErrorResponse = {
			error: "Could not find product with that ID",
			errorTrace: error,
		};

		return NextResponse.json(errorData, { status: 404 });
	}
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get(`id`) as string;

	if (id) {
		return await getProductById(id);
	}
}
