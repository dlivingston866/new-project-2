const mongoose = require("mongoose");

// Create Schema
let User = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },
});

module.exports = User = mongoose.model("users", User);
