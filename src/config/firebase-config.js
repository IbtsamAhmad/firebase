// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA77zRTjrsiLcdA8nKqUzccNghhJgZk3UQ",
  authDomain: "fir-login-5f6f0.firebaseapp.com",
  projectId: "fir-login-5f6f0",
  storageBucket: "fir-login-5f6f0.appspot.com",
  messagingSenderId: "44940391215",
  appId: "1:44940391215:web:e6c898e6bc0441ce61a7da",
  measurementId: "G-W1L104QYKP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);
