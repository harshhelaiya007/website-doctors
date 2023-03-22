const express = require('express');
const router = express.Router();
const Signup = require('../model/signUpModel');
const mongoose = require('mongoose');

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

router.post('/',(req,res,next)=>{
    // console.log(req.body);
    const signUp = new Signup({
        _id:new mongoose.Types.ObjectId,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    })

    signUp.save()
    .then(result=> {
        console.log(result)
        res.status(200).json({
            newSignUp:result
        })
    })
    .catch(error=> {
        console.log(error);
        res.status(500).json({
            error:error
        })
    })
})

module.exports = router;