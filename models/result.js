const mongoose = require("mongoose");

const studentResultSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  marks: {
    type: Map, 
    of: Number,
    required: true
  }
});

exports.module = mongoose.model("StudentResult", studentResultSchema);