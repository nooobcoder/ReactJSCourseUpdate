// Invoking environment variables
require("dotenv").config();

const SERVER_PORT = process.env.SERVER_PORT;

const express = require("express");
const app = express();
const cors = require("cors");

// Rate Limiting action
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20 });

// Register the middleware for rate limitting action.
app.use(limiter);
app.set("trust proxy", 1);

// Enable CORS - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// Set static folder
app.use(express.static("public"));

app.use("/api", require("./routes/index").router);

// Catch all unknown routes
app.get("*", (_req, res) =>
	res.sendFile("./public/404.html", { root: __dirname })
);

// Last thing of Express - Do not put anything related to express below this
app.listen(SERVER_PORT || 5000, () =>
	console.log(`Server Listening on PORT ${SERVER_PORT || "5000"}`)
);
