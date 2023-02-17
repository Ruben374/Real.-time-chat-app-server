const express = require("express");
import morgan from "morgan";
const cors = require("cors");
const routes = require("./routes");
import passport from "passport";
import session from "express-session";
const dotenv = require('dotenv');
dotenv.config()
//const auth = require("./routes/auth.route")

const app = express();
require("./services/auth/passport")(passport);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use("/auth",auth);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/", routes);
export default app;
