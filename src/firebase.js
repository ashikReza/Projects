// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBgRlpstBLuRFeJ_ZbhP0CYmpslP8KybI",
  authDomain: "blog-5215b.firebaseapp.com",
  projectId: "blog-5215b",
  storageBucket: "blog-5215b.appspot.com",
  messagingSenderId: "526421051198",
  appId: "1:526421051198:web:53c39735a46c5774aace6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
