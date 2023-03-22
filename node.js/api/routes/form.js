const express = require('express');
const router = express.Router();
const doctorFormsModel = require('../model/formModel');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    doctorForms.find()
        .then(result => {
            res.status(200).json({
                doctorForms: result
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
})

router.post('/', (req, res, next) => {
    console.log(req.body);
    const doctorForms = new doctorFormsModel({
        _id: new mongoose.Types.ObjectId,
        doctorName: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        region: req.body.region,
        hq: req.body.hq,
        fsoName: req.body.fsoName,
        doctorNumber: req.body.doctorNumber,
        doctorImage: req.body.doctorImage,
    })

    doctorForms.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                doctorForms: result
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