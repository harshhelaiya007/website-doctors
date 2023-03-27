const express = require('express');
const router = express.Router();
const Signup = require('../model/signUpModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


router.post('/', async (req, res, next) => {

    // console.log(req.body);

    // Validate user input
    const { email } = req.body;

    const oldUser = await Signup.findOne({ email });

    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const signUp = new Signup({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        email: req.body.email,
        region: req.body.region,
        hq: req.body.hq,
        fsoname: req.body.fsoname,
        password: encryptedPassword,
    })

    // Create token
    const token = jwt.sign(
        { user_id: signUp._id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    // save user token
    signUp.token = token;

    signUp.save()
        .then(result => {
            res.status(200).json({
                newSignUp: result,
                registed: true
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