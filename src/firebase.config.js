// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "temporarily-f4980.firebaseapp.com",
  projectId: "temporarily-f4980",
  storageBucket: "temporarily-f4980.appspot.com",
  messagingSenderId: "532402293340",
  appId: "1:532402293340:web:cfb9bf78a5caf14f3f3499",
  measurementId: "G-6GW1Y50KBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFirestore();