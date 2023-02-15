const routes = require("express").Router();
routes.use("/upload", require("./upload.route"));
module.exports = routes;
