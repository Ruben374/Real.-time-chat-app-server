import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const User = require("../../models/Users.model");
module.exports = async (req: Request, res: Response, next: Function) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid authorization" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { Credential } = jwt.verify(token, process.env.JWT_SECRET ?? "");
    const user = User.findOne({ id: Credential });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid authorization" });
    }

    res.locals.id = Credential;
    next();
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(400)
      .json({ error: true, message: "Invalid authorization" });
  }
};
