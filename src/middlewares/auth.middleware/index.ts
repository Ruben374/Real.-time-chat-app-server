import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
module.exports = async (req: Request, res: Response, next: Function) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid authorization" });
  }
  const token = authorization.split(" ")[1];
  const { Credential } = jwt.verify(token, process.env.JWT_SECRET ?? "");
  res.locals.email = Credential;
  next();
};
