const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, getDoc, updateDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  console.log("Initializing Firebase test...");
  try {
    const docRef = doc(db, 'downloads', 'dwn_mock_1');
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      console.log("Document dwn_mock_1 not found in 'downloads' collection.");
      return;
    }
    const data = snap.data();
    console.log("Current document data:", data);
    const newCount = (data.downloadCount || 0) + 1;
    console.log(`Incrementing downloadCount to ${newCount}...`);
    await updateDoc(docRef, { downloadCount: newCount });
    console.log("Successfully updated downloadCount in Firestore!");
    const updatedSnap = await getDoc(docRef);
    console.log("Updated data:", updatedSnap.data());
  } catch (err) {
    console.error("Error during Firestore test:", err);
  }
}

test().then(() => process.exit(0));
