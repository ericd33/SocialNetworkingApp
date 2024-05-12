let admin = require("firebase-admin");

import * as dotenv from 'dotenv';

dotenv.config()

const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FBASE_PT,
  "private_key_id": process.env.FBASE_PID,
  "private_key": process.env.FIREBASE_PCONF,
  "client_email": process.env.FCEMAIL,
  "client_id": process.env.FCID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FCERT,
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;
