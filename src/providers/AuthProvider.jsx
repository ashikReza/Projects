/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AuthContext } from "../context/index.js";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import the necessary Firebase functions

// Initialize Firebase app
const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyDBgRlpstBLuRFeJ_ZbhP0CYmpslP8KybI",
  authDomain: "blog-5215b.firebaseapp.com",
  projectId: "blog-5215b",
  storageBucket: "blog-5215b.appspot.com",
  messagingSenderId: "526421051198",
  appId: "1:526421051198:web:53c39735a46c5774aace6f",
};

const app = initializeApp(firebaseConfig);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    const auth = getAuth(app); // Get the authentication instance from Firebase app
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuth(user ? { user } : null); // Update authentication state
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
