// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDc7fHkbT0EvC54oa2Zy3l7TBHtO97SsVM",
  authDomain: "food-ms-6c79f.firebaseapp.com",
  projectId: "food-ms-6c79f",
  storageBucket: "food-ms-6c79f.firebasestorage.app",
  messagingSenderId: "393664359067",
  appId: "1:393664359067:web:e080905cff27415cf0b43e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
