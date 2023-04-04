const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  cardId: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  region: {
    type: String,
    required: true
  },
  hq: {
    type: String,
    required: true
  },
  fsoname: {
    type: String,
    required: true
  },
  doctorNumber: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;