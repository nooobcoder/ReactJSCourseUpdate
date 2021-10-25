// Invoking environment variables
require("dotenv").config();

const SERVER_PORT = process.env.SERVER_PORT;

const express = require("express");
const app = express();
const cors = require("cors");

// Enable CORS - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

app.use("/api", require("../routes/index").router);

// Catch all unknown routes
app.get("*", (_req, res) => res.sendFile("404.html", { root: __dirname }));

// Last thing of Express - Do not put anything related to express below this
app.listen(SERVER_PORT || 5000, () =>
	console.log(`Server Listening on PORT ${SERVER_PORT || "5000"}`)
);
