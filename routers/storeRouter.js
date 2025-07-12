const express = require('express');
const userRouter = express.Router();

const {dashboard} = require('../controllers/userController');
const {viewResult} = require('../controllers/userController');
const {protect} = require("../middleware/validation");

userRouter.get("/",dashboard);
userRouter.get("/view-result",protect,viewResult);

module.exports = userRouter;