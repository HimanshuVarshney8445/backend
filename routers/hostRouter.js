const express = require('express');
const hostRouter = express.Router();

const {addResult} = require('../controllers/hostController');

hostRouter.get("/add-result",addResult);

module.exports = hostRouter;