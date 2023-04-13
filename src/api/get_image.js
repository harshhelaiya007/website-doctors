const express = require("express");
const { getImage } = require("../../s3");
const router = express.Router();



router.get("/:image", (req, res) => {
  getImage(req.params.image, res);
});

module.exports = router;
