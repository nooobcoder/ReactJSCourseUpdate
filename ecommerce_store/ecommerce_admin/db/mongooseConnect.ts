import mongoose, { ConnectOptions } from "mongoose";
import { MONGODB_URI } from "./mongo";

const mongooseConnect = () => {
	if (mongoose.connection.readyState == 1) {
		console.log("ALREADY CONNECTED TO MONGO");

		return mongoose.connection.asPromise();
	} else {
		console.log("CONNECTING TO MONGO");
		const mongooseConnectionOptions: ConnectOptions = {
			dbName: `ecommerce-app`,
			authSource: "admin",
		};
		console.log("CONNECTED TO MONGO");

		return mongoose.connect(MONGODB_URI, mongooseConnectionOptions);
	}
};

export { mongooseConnect };
