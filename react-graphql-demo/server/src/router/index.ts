import { Router } from "express";
const routeHandler = Router();

routeHandler.get("/", (req, res) => res.send("You have been heard!"));

export { routeHandler };
