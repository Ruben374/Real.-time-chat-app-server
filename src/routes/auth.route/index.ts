import { Express } from "express";
const route: Express = require("express").Router();
import passport from "passport";
//const controller = require("../../controllers/upload.controller");
const jwt = require("jsonwebtoken");

route.get("/x", (req: any, res: any) => {
  res.json("ola mundo");
});
route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

route.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req: any, res: any) {
    // Successful authentication, redirect home.
    //console.log(req.user.emial);
    const token = jwt.sign(
      { Credential: req.user.email },
      process.env.JWT_SECRET
    );
    console.log(token);
    res.set("Authorization", `Bearer ${token}`);
    res.redirect("/dashboard");
  }
);
module.exports = route;
