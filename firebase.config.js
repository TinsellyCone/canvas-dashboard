// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "canvas-dashboard-f88c2.firebaseapp.com",
  projectId: "canvas-dashboard-f88c2",
  storageBucket: "canvas-dashboard-f88c2.appspot.com",
  messagingSenderId: "849124519280",
  appId: "1:849124519280:web:4414e71bbe00b84df173b5",
  databaseURL: "https://canvas-dashboard-f88c2-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
