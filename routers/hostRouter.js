const express = require('express');
const hostRouter = express.Router();

const {addBatch} = require('../controllers/hostController');
const {addPostBatch} = require('../controllers/hostController');
const {protect} = require("../middleware/validation");
const { submitMarks } = require("../controllers/hostController");
// const {postSubmitMarks} = require('../controllers/hostController');


hostRouter.get("/batch",protect,addBatch);
hostRouter.post("/batch",addPostBatch);
hostRouter.post("/submit-marks", protect, submitMarks);
// hostRouter.get("/submit-marks",addPostResult);
// hostRouter.post("/submit-marks",postSubmitMarks);

module.exports = hostRouter;