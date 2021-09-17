import express from "express";
const app = express();

import { graphqlHTTP } from "express-graphql";
//// !

import { routeHandler } from "./router/index.js";
import { graphqlSchema as schema } from "./schema/schema.js";

app.use(routeHandler);
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.listen(3000, () => console.log("Now listening all requests on port 3000"));
