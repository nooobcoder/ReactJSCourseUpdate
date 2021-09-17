import express from "express";
var app = express();
import { graphqlHTTP } from "express-graphql";
//// !
import { routeHandler } from "./router/index.js";
import { graphqlSchema as schema } from "./schema/schema.js";
app.use(routeHandler);
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));
app.listen(3000, function () { return console.log("Now listening all requests on port 3000"); });
//# sourceMappingURL=index.js.map