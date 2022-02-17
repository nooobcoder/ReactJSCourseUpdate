// This file is responsible for connecting the server to the mongodb database
const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			`${process.env.MONGODB_CONNECT_STRING}`,
			{ useNewUrlParser: true }
		);
		console.log(`MONGODB CONNECTED: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
