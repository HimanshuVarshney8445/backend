const express = require('express');
const userRouter = express.Router();

const {dashboard} = require('../controllers/userController');
const {viewResult} = require('../controllers/userController');
const {profile} = require('../controllers/userController');
const {protect} = require("../middleware/validation");
const user = require('../models/user');

userRouter.get("/",dashboard);
userRouter.get("/profile",protect,profile);
userRouter.get("/view-result",protect,viewResult);

module.exports = userRouter;