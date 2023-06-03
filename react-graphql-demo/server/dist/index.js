import express from "express";
var app = express();
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
//// !
import cors from "cors";
// Allow cross-origin requests
app.use(cors());
// make sure to replace my db string & creds with your own
mongoose.connect("mongodb://admin:adminadmin@192.168.0.118:27017/graphql?authSource=admin&readPreference=primary&appname=GraphQL%20Tutorial&directConnection=true&ssl=false");
mongoose.connection.once("open", function () {
    console.log("[CONNECTED TO DB INSTANCE]");
});
import { routeHandler } from "./router/index.js";
import { graphqlSchema as schema } from "./schema/schema.js";
app.use(routeHandler);
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(3000, function () { return console.log("Now listening all requests on port 3000"); });
//# sourceMappingURL=index.js.map