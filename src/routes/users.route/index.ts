import { Express } from "express";
const route: Express = require("express").Router();
const controller = require("../../controllers/users.controller");
const middleware = require("../../middlewares/auth.middleware");
route.get("/", middleware, controller.GetUserData);
module.exports = route;
