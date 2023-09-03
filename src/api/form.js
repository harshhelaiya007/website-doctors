const express = require('express');
const router = express.Router();
const Doctor = require('../model/forms');
const multer = require('multer');
const s3 = require('../../s3');
const upload = multer({ dest: 'uploads' });

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

// Define doctor creation endpoint
router.post('/', async (req, res) => {
  // Check for validation errors
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  // }

  // Extract doctor input from request body
  const {
    cardId,
    reference,
    name,
    region,
    hq,
    ps,
    doctorNumber,
    doctorPlace,
    doctorSpeciality,
  } = req.body;

  try {
    // Upload image to S3 bucket
    const file = req.files.image;
    const imageUrl = await s3.uploadImage(file);

    // Create new doctor
    doctor = new Doctor({
      cardId,
      reference,
      doctorNumber,
      name,
      region,
      hq,
      ps,
      doctorPlace,
      doctorSpeciality,
      image: imageUrl,
    });
    // Save new doctor to database
    await doctor.save();

    // Return success response with new doctor information
    res.json({
      msg: 'Doctor created successfully',
      doctor,
      data: 'successfully data saved',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
