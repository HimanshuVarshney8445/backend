import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  subjects: {
    type: [String],
    required: true
  },
  numberOfEntries: {
    type: Number,
    required: true
  }
});

exports.module = mongoose.model("Batch", batchSchema);