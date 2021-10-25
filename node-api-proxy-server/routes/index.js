const express = require("express");
const router = express.Router();
const needle = require("needle");

// ===== Environment Variables =====
// |                               |
const API_BASE_URL = process.env.API_BASE_URL;
const OPENWEATHER_API_NAME = process.env.OPENWEATHER_API_NAME;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
// |                               |
// =================================

router.get("/", async (req, res) => {
	if (!API_BASE_URL || !OPENWEATHER_API_KEY || !OPENWEATHER_API_NAME) {
		res.json({
			status: "Variable Resolution Error",
			message:
				"There was an error in resolving the environment variables. Please provide this message to the developer for this issue to be fixed.",
		});
	} else {
		try {
			const params = new URLSearchParams({
				appid: OPENWEATHER_API_KEY,
				...req.query,
			});
			console.log(params);
			const { body } = await needle("get", `${API_BASE_URL}?${params}`);
			if (body.cod >= 400) {
				throw body;
			}
			res.status(200).json(body);
		} catch (error) {
			console.error("[ ERROR ⚠️]", error);
			res.status(500).json({ ...error });
		}
	}
});

module.exports = { router };
