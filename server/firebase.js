const admin = require('firebase-admin');
const serviceAccount = require('./firebaseConfig.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://litcritique-a8ac9.firebaseio.com" 
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };