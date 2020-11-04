const mongoose = require("mongoose");

// Create Schema
let Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = Post = mongoose.model("posts", Post);
