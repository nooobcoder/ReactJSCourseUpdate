const express = require("express");
const router = express.Router();
const stripe = require("../server");

router.post("/", async (req, res) => {
	try {
		// Create a checkout session with Stripe
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			// For each item use the id to get it's details
			// Take that information and convert it to Stripe's format
			line_items: req.body.items.map(({ id, quantity }) => {
				const storeItem = storeItems.get(id);
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: storeItem.name,
						},
						unit_amount: storeItem.priceInCents,
					},
					quantity: quantity,
				};
			}),
			mode: "payment",
			// Set a success and cancel URL we will send customers to
			// They are complete urls
			success_url: `${process.env.CLIENT_URL}/success.html`,
			cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
		});
		res.json({ url: session.url });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

module.exports = router;
