const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
  image:
  {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
