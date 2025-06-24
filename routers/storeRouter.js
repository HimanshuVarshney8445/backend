const express = require('express');
const userRouter = express.Router();

const {dashboard} = require('../controllers/userController');
const {viewResult} = require('../controllers/userController');

userRouter.get("/",dashboard);
userRouter.get("/view-result",viewResult);

module.exports = userRouter;