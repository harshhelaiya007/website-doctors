const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({}, { strict: false });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
