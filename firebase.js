// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'metaspace-fb-clone.firebaseapp.com',
  projectId: 'metaspace-fb-clone',
  storageBucket: 'metaspace-fb-clone.appspot.com',
  messagingSenderId: '397875607389',
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length < 1 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };