// Page to add a new product
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
	name: string;
	description: string;
	price: number;
};

const NewProduct = () => {
	// Use react-hook-form
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const router = useRouter();

	const onSubmit = async (data: FormData) => {
		try {
			// send data as a POST request to /api/product/new
			let res = await fetch(`/api/product/new`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			// If response is ok, redirect to /products
			if (res.status === 201) {
				res = await res.json();

				// TODO: Convert to a server component, and redirect(`/products`)
				router.replace("/products");
			}
		} catch (err) {
			console.error(err);
		}
	};

	// Watch input value by passing the name of it
	// console.log(watch("productName"));

	return (
		<div className="flex-grow p-4 mt-1 mb-0 mr-2 space-y-2 rounded-lg">
			<h1 className="text-2xl font-bold text-center">New Product</h1>
			<hr className="border-black rounded-full dark:border-gray-500 border-1" />
			<div className="flex flex-col">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="flex flex-col">
						<label htmlFor="productName" className="text-xl">
							Product Name
						</label>
						<input
							placeholder="Product Name"
							{...register("name", { required: true })}
						/>
					</div>
					{errors.name && (
						<span className="font-semibold text-blue-100 dark:text-red-400">
							*Product name is required
						</span>
					)}
					<div className="flex flex-col">
						<label htmlFor="description" className="text-xl">
							Product Description
						</label>
						<textarea
							placeholder="Product Description"
							{...register("description")}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="price" className="text-xl">
							Price (in INR{" "}
							<span role="india-flag-emoji" aria-label="flag-emoji">
								🇮🇳
							</span>
							)
						</label>
						<input
							placeholder="Price: ₹100"
							{...register("price", { required: true })}
							type="number"
							min="1"
						/>
						{errors.price && (
							<span className="font-semibold text-blue-100 dark:text-red-400">
								*Product price is required
							</span>
						)}
					</div>
					<button type="submit" className="button-pink">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewProduct;
