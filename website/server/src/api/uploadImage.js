const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'uploads'});
// storage
router.post('/',upload.single('image') ,async (req, res) => {
    res.send('done')
});

module.exports = router;