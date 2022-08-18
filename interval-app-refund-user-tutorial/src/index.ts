import Interval from "@interval/sdk";

require("dotenv").config();

const interval = new Interval({
	apiKey: process.env.INTERVAL_KEY || "<YOUR API KEY>",
	actions: {
		hello_world: async (io) => {
			const name = await io.input.text("Your name");
			return `Hello, ${name}`;
		},
	},
});

// This is important! If you don't call listen(), your app won't connect to Interval.
interval.listen();
