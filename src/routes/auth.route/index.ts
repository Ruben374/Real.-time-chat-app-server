import { Express } from "express";
const route: Express = require("express").Router();
import passport from "passport";
//const controller = require("../../controllers/upload.controller");
const jwt = require("jsonwebtoken");
const Users = require("../../models/Users.model");

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
  async function (req: any, res: any) {
    // Successful authentication, redirect home.
    //console.log(req.user.emial);
    const user = await Users.findOne({ email: req.user.email })
      .then((data: any) => data)
      .catch((error: Error) => res.redirect("/auth/google"));
    if (!user) {
      res.redirect("/auth/google");
    }
    const token = jwt.sign({ Credential: user._id }, process.env.JWT_SECRET);
    console.log(token);
    res.redirect("http://localhost:3001/?token=" + encodeURIComponent(token));
  }
);
module.exports = route;
