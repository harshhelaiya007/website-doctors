const express = require('express');
const router = express.Router();
const Doctor = require('../model/forms');

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({}, 'name email region hq fsoname doctorNumber').exec();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;