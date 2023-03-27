const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, default: null },
  email: { type: String, unique: false },
  region: { type: String, default: null },
  hq: { type: String, default: null },
  fsoName: { type: String, default: null },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);