import { Express } from "express";
const route: Express = require("express").Router();
const Message = require("../../models/Messages.model");

route.route("/").get((req: any, res: any, next: any) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  Message.find({}).then((message: any) => {
    res.status(200).json(message);
  });
});
module.exports = route;
