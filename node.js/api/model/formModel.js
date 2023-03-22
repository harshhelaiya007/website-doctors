const mongoose = require('mongoose');

const doctorForms = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    doctorName: String,
    email: String,
    dob: String,
    region: String,
    hq: String,
    fsoName: String,
    doctorNumber: Number,
    doctorImage: String
})

module.exports = mongoose.model('doctorForms', doctorForms);