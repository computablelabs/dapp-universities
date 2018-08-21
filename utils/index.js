const AWS = require('aws-sdk');
const athena = require('athena-client');

const creds = new AWS.Credentials(
  process.env.AWS_ACCESS_KEY_ID,
  process.env.AWS_SECRET_KEY,
);

const awsConfig = {
  region: process.env.AWS_REGION,
  credentials: creds,
};

const clientConfig = {
  bucketUri: process.env.AWS_BUCKET,
};

const client = athena.createClient(clientConfig, awsConfig);

const submitQuery = async (searchTerm) => {
  const query = `select * from demo.genome where genotype='${searchTerm}' limit 10;`;

  try {
    const searchResult = await client.execute(query);
    return searchResult;
  } catch (err) {
    console.log('search error: ', err);
    return '';
  }
};

module.exports = { submitQuery };

