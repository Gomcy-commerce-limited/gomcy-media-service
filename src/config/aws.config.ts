import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: 'your_access_key_id',
    secretAccessKey: 'your_secret_access_key',
    region: 'your_bucket_region',
});

const s3 = new AWS.S3();

export default s3;