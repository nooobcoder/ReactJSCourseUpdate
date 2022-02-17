// Connection String: mongodb://admin:adminadmin@127.0.0.1:27017/?authSource=admin&readPreference=primary&ssl=false

const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler); // Custom error handler
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
