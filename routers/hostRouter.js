const express = require('express');
const hostRouter = express.Router();

const {addResult} = require('../controllers/hostController');
const {addPostResult} = require('../controllers/hostController');
// const {submitMarks} = require('../controllers/hostController');
// const {postSubmitMarks} = require('../controllers/hostController');


hostRouter.get("/add-result",addResult);
hostRouter.post("/add-result",addPostResult);
// hostRouter.get("/submit-marks",addPostResult);
// hostRouter.post("/submit-marks",postSubmitMarks);

module.exports = hostRouter;