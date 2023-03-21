const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    username:String,
    email:String,
    password:String,
    confirmPassword:String
})

module.exports = mongoose.model('Signup',signUpSchema);