import { Express } from "express";
const route: Express = require("express").Router();
const controller = require("../../controllers/chats.controller");
const Chats = require("../../models/Chat.model");

route.get("/", controller.GetChat);
route.post("/createchat", controller.CreateChat);
module.exports = route;
