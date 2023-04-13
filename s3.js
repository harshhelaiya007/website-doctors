require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const path = require("path");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const uploadImage = (image) => {
  const file = Buffer.from(image.data, "binary");

  const ext = image.name.split(".");

  const imageName = `${Date.now()}.${ext[ext.length - 1]}`;

  const params = {
    Bucket: bucketName,
    Key: `images/${imageName}`,
    Body: file,
  };

  return s3
    .upload(params)
    .promise()
    .then((data) => imageName);
};

const getImage = (image, res) => {
  const params = { Bucket: bucketName, Key: "images/" + `${image}` };
  s3.headObject(params, function (err, data) {
    if (err) {
      res.send({ message: "Error" });
    } else {
      s3.getObject(params).createReadStream().pipe(res);
    }
  });
};

module.exports = { uploadImage, getImage };
