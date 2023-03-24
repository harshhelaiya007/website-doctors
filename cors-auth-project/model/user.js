const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, unique: true },
  confirmPassword: { type: String }
});

module.exports = mongoose.model("user", userSchema);