const express = require("express");
const authRouter = express();

const {getLogin} = require("../controllers/authController");
const {postLogin} = require("../controllers/authController");
const {getSignUp} = require("../controllers/authController");
const {postSignUp} = require("../controllers/authController");
const {getLogout} = require("../controllers/authController");


authRouter.get("/login",getLogin);
authRouter.post("/login",postLogin);
authRouter.get("/sign-up",getSignUp);
authRouter.post("/sign-up",postSignUp);
authRouter.get("/logout",getLogout);

module.exports = authRouter;