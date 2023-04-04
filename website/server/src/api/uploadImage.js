const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // You may need to install the `uuid` package

const { uploadFile, getFileStream } = require('../../s3');

const upload = multer();

// Upload an image file to S3
router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    const file = req.file;
    const result = await uploadFile(file);
    res.status(200).json({ success: true, fileUrl: result.Location });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Retrieve an image file from S3
router.get('/image/:key', async (req, res, next) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
