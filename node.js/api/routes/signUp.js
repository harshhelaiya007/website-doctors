const express = require('express');
const router = express.Router();
const Signup = require('../model/signUpModel');
const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../crypto');

// router.get('/',(req,res,next)=>{
//     Signup.find()
//     .then(result=>{
//         res.status(200).json({
//             Signup:result
//         })
//     })
//     .catch(error=>{
//         console.log(error)
//         res.status(500).json({
//             error:error
//         })
//     })
// })


router.post('/', (req, res, next) => {
    // console.log(req.body);
    const signUp = new Signup({
        _id: new mongoose.Types.ObjectId,
        username: encrypt(req.body.username),
        email: encrypt(req.body.email),
        password: encrypt(req.body.password),
        confirmPassword: encrypt(req.body.confirmPassword)
    })

    signUp.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                newSignUp: result,
                message: true
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        })
})

module.exports = router;