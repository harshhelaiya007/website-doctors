const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  region: {
    type: String,
    required: false,
  },
  hq: {
    type: String,
    required: false,
  },
  fsoname: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
