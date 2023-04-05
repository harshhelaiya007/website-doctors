require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const path = require('path');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})


const uploadImage = (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const fileExtension = fileName.split('.').pop();
  const contentType = `image/${fileExtension}`;

  const params = {
    Bucket: bucketName,
    Key: `${Date.now()}.${fileExtension}`,
    Body: fileContent,
    ContentType: contentType,
  };

  return s3.upload(params).promise()
    .then(data => data.Location);
};

module.exports = { uploadImage };
