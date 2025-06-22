const express = require('express');
const userRouter = express.Router();

const {dashboard} = require('../controllers/userController');

userRouter.get("/",dashboard);

module.exports = userRouter;