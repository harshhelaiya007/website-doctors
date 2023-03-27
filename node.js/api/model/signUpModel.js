const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: { String, },
    email: { String },
    region: { String },
    hq: { String },
    fsoname: { String },
    password: { String },
    token: { type: String },
})

module.exports = mongoose.model('Signups', signUpSchema);