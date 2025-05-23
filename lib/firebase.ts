// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxlQmLv0FcoCYrbdmAV3U1zhMib7vFMUQ",
  authDomain: "sharkinformatica-c0c00.firebaseapp.com",
  projectId: "sharkinformatica-c0c00",
  storageBucket: "sharkinformatica-c0c00.firebasestorage.app",
  messagingSenderId: "999696462961",
  appId: "1:999696462961:web:b4f7c28dc691533da057d0",
  measurementId: "G-2263TLMCVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
