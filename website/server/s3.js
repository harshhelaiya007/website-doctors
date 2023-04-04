require('dotenv').config()
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;

const s3 = new S3({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

// uploads a file to s3
async function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  };

  const result = await s3.upload(uploadParams).promise();
  await fs.promises.unlink(file.path);

  return result;
}
exports.uploadFile = uploadFile;


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: AWS_BUCKET_NAME
  };
  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
