const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-8f915.firebaseio.com"
});

const db = admin.firestore();

exports.createUserAndStoreData = functions.https.onRequest(async (req, res) => {
  try {
    const userRecord = await admin.auth().createUser({
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
      displayName: req.body.displayName,
      disabled: false
    });
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email
    });
    res.status(200).send('User created and data stored in Firestore');
  } catch (error) {
    res.status(500).send('Error creating user:', error);
  }
});