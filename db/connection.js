import { MongoClient } from 'mongodb';

import { decrypt } from '../app/credentials/crypto.js';

// Replace the following with values for your environment.
const credentials = JSON.parse(decrypt()).DB;
const username = encodeURIComponent(credentials.username);
const password = encodeURIComponent(credentials.password);
const clusterUrl = 'cluster0.mcmnf.mongodb.net/dev';
const authMechanism = 'DEFAULT';
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}?authMechanism=${authMechanism}`;

const client = new MongoClient(
  uri,
  {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
    maxPoolSize:        50,
    wtimeoutMS:         2500,
    retryWrites:        true,
    w:                  'majority',
  }
);

client.connect().catch((err) => {
  console.error(err.stack);
  process.exit(1);
}).then(() => {
  // console.log(client.db('dev'));
  // TODO
  // inject client to DAO / models
});
