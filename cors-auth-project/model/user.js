const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  region: { type: String },
  hq: { type: String },
  fsoname: { type: String },
  password: { type: String },
  confirmPassword: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);