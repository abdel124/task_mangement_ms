const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_REGION
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
module.exports = dynamoDB;
