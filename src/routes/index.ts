const routes = require("express").Router();
/* routes.use("/", (req: any, res: any) => {
  return res.status(200).json("welocome to /api/v1/");
}); */
routes.use("/upload", require("./upload.route"));
routes.use("/auth", require("../routes/auth.route"));
routes.use("/chat", require("../routes/chats.route"));
routes.use("/message", require("../routes/message.route"));
routes.use("/users", require("../routes/users.route"));
module.exports = routes;
