const express = require('express');
const router = express.Router();
const Signup = require('../model/signUpModel');

router.get('/',(req,res,next)=>{
    Signup.find()
    .then(result=>{
        res.status(200).json({
            Signup:result,
            message:true
        })
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            error:error
        })
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        msg:'login working post'
    })
})

module.exports = router;