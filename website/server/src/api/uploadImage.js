const express = require('express');
const router = express.Router();
const multer = require('multer')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const upload = multer({ dest: 'uploads' });

// const { uploadFile, getFileStream } = require('../../s3')
// storage
router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)

    // apply filter
    // resize 

    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    res.send({ imagePath: `/images/${result.Key}` })
});



// get 
router.get('/images/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

module.exports = router;