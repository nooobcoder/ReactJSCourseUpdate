import { Router } from "express";
var routeHandler = Router();
routeHandler.get("/", function (req, res) { return res.send("You have been heard!"); });
export { routeHandler };
//# sourceMappingURL=index.js.map