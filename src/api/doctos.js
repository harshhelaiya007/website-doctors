const express = require('express');
const router = express.Router();
const Doctor = require('../model/forms');

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({}, 'cardId name reference region hq fsoname image').exec();
    res.status(200).json({doctors});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndDelete({ _id: req.params.id });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;