const express = require('express');
const userRouter = express.Router();
const rootDir = require('../utils/pathUtil');
const path = require('path');

userRouter.get("/",(req,res,next)=>{
    res.render('store/home');
})

module.exports = userRouter;