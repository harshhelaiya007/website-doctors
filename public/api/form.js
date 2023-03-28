const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Doctor = require('../model/forms');

// Define doctor creation endpoint
router.post('/', [
    // Validate user input
    check('name', 'Please enter the doctor name').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('region', 'Please enter the region').notEmpty(),
    check('hq', 'Please enter the headquarters').notEmpty(),
    check('fsoname', 'Please enter the FSO name').notEmpty(),
    check('doctorNumber', 'Please enter the doctor number').notEmpty(),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract doctor input from request body
    const { name, email, region, hq, fsoname, doctorNumber, image } = req.body;

    try {
        // Check if doctor with given email exists
        let doctor = await Doctor.findOne({ email });
        if (doctor) {
            return res.status(400).json({ msg: 'Doctor already exists' });
        }

        // Create new doctor
        doctor = new Doctor({
            name,
            email,
            region,
            hq,
            fsoname,
            doctorNumber,
            image
        });
        console.log(doctor)
        // Save new doctor to database
        await doctor.save();

        // Return success response with new doctor information
        res.json({ msg: 'Doctor created successfully', doctor, data: 'successfully data saved' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
