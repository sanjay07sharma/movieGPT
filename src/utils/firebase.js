import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjPHSK599-EUNedQFYMvBgdfBk6ATE4aY",
  authDomain: "moviegpt-869e0.firebaseapp.com",
  projectId: "moviegpt-869e0",
  storageBucket: "moviegpt-869e0.appspot.com",
  messagingSenderId: "398774312426",
  appId: "1:398774312426:web:396b673e82d52645612693",
  measurementId: "G-PLJJ88RSRP"
};

// Initialize Firebaseexport PATH=/usr/local/bin:/usr/bin:/bin:$PATH
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
