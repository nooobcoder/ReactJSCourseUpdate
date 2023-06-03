// Load environment variables from the .env file
require("dotenv").config();

// Setup express
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

// Setup stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// This is the list of items being sold
const storeItems = new Map([
	[1, { priceInCents: 10000, name: "JavaScript Tutorial" }],
	[2, { priceInCents: 15000, name: "Ultimate CSS tutorial" }],
]);

// Start up our server on port 3000
app.listen(3000);

// I am posting a request using POST to checkout page
fetch("/checkout", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		items: [
			{
				id: 1,
				quantity: 5,
			},
			{
				id: 2,
				quantity: 2,
			},
		],
	}),
})
	.then((res) => {
		if (res.ok) return res.json();
		// If there is an error then make sure we catch that
		return res.json().then((e) => console.error(err));
	})
	.then(({ url }) => {
		// On success redirect the customer to the returned URL
		window.location = url;
	})
	.catch((e) => {
		console.error(e.error);
	});

/* Here, we send a POST request to our backend, saying that we need this many things. Our backend then sends a response. If successful, it will redirect us to the merchant page, else we handle the error. */
const checkout = require("./api/checkout.js");
app.use("/checkout", checkout);

module.exports = stripe;
