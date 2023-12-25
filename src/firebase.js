// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT6lznbDrFZ9QRBk82e_KeezloMpD9-Mo",
  authDomain: "todo-app-31041.firebaseapp.com",
  projectId: "todo-app-31041",
  storageBucket: "todo-app-31041.appspot.com",
  messagingSenderId: "87321386154",
  appId: "1:87321386154:web:69724f8b088accaaf4c4d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
