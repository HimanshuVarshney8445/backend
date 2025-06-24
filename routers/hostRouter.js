const express = require('express');
const hostRouter = express.Router();

const {addResult} = require('../controllers/hostController');
const {addPostResult} = require('../controllers/hostController');


hostRouter.get("/add-result",addResult);
hostRouter.post("/add-result",addPostResult);

module.exports = hostRouter;