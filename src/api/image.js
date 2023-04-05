const express = require('express');
const multer = require('multer');
const s3 = require('../../s3');
const Image = require('../model/image');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), (req, res) => {
    const file = req.file;

    s3.uploadImage(file.path)
        .then(url => {
            const image = new Image({ url });
            return image.save();
        })
        .then(result => {
            res.send({ message: 'Image uploaded and URL saved successfully', response: result.url });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error uploading image');
        });
});

module.exports = router;
