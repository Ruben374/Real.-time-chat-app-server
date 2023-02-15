import { Express } from "express";
import { upload } from "../../services/multer";
const route: Express = require("express").Router();
const controller = require("../../controllers/upload.controller");
route.post("/",upload.single("file"),controller.Upload);
module.exports = route;
