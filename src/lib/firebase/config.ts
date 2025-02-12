import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config settings
const firebaseConfig = {
  apiKey: "AIzaSyBhhG9B1OilB6sWri-YO-TSDf_K5nOMLAU",
  authDomain: "refreeg-platform.firebaseapp.com",
  projectId: "refreeg-platform",
  storageBucket: "refreeg-platform.appspot.com",
  messagingSenderId: "577446198718",
  appId: "1:577446198718:web:b5449a7d4f60467e894def",
  measurementId: "G-H60QNGPDF5",
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { getFirestore };

export { auth, db, app };
