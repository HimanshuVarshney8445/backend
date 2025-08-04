const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    unique: true
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

module.exports = mongoose.model("Batch", batchSchema);